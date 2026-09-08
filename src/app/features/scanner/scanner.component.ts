import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../core/supabase/supabase.service';
import { ProductsService } from '../../core/services/products.service';
import { InventoryMovementsService } from '../../core/services/inventory-movements.service';
import { SalesService } from '../../core/services/sales.service';
import { Product } from '../../core/models/product.model';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CardComponent } from '../../shared/ui/card/card.component';
import { AlertComponent } from '../../shared/ui/alert/alert.component';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';

interface ScanLogEntry {
  barcode: string;
  found: boolean;
  productName?: string;
  at: Date;
}

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonComponent, CardComponent, AlertComponent, BadgeComponent],
  templateUrl: './scanner.component.html',
})
export class ScannerComponent {
  @ViewChild('barcodeInput') barcodeInputRef?: ElementRef<HTMLInputElement>;

  readonly barcode = signal('');
  readonly processing = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly lastMatch = signal<Product | null>(null);
  readonly log = signal<ScanLogEntry[]>([]);

  constructor(
    private readonly supabase: SupabaseService,
    private readonly productsService: ProductsService,
    private readonly movementsService: InventoryMovementsService,
    private readonly salesService: SalesService
  ) {}

  async handleScan(): Promise<void> {
    const code = this.barcode().trim();
    if (!code) return;

    this.processing.set(true);
    this.errorMessage.set('');
    this.lastMatch.set(null);

    try {
      const product = await this.productsService.findByBarcode(code);

      const { data: userData } = await this.supabase.client.auth.getUser();
      await this.supabase.client.from('scanner_events').insert({
        barcode: code,
        source: 'keyboard-scanner',
        resolved_product_id: product?.id ?? null,
        created_by: userData.user?.id,
      });

      this.log.update((entries) => [
        { barcode: code, found: !!product, productName: product?.name, at: new Date() },
        ...entries,
      ].slice(0, 10));

      if (product) {
        this.lastMatch.set(product);
      } else {
        this.errorMessage.set(`No se encontró ningún producto con el código "${code}".`);
      }
    } catch (err) {
      this.errorMessage.set(err instanceof Error ? err.message : 'Error al procesar el escaneo.');
    } finally {
      this.barcode.set('');
      this.processing.set(false);
      this.barcodeInputRef?.nativeElement.focus();
    }
  }

  async registerStockIn(product: Product): Promise<void> {
    try {
      await this.movementsService.registerMovement(product.id, 'in', 1, 'scanner', 'Entrada por escaneo');
      this.lastMatch.set({ ...product, stock: product.stock + 1 });
    } catch (err) {
      this.errorMessage.set(err instanceof Error ? err.message : 'Error al registrar el movimiento.');
    }
  }

  async registerQuickSale(product: Product): Promise<void> {
    try {
      const result = await this.salesService.createSale(
        [
          {
            product_id: product.id,
            name: product.name,
            unit_price: product.sale_price,
            quantity: 1,
            track_inventory: product.track_inventory,
            available_stock: product.stock,
          },
        ],
        'Efectivo'
      );
      this.lastMatch.set(null);
      this.errorMessage.set('');
      this.successMessage.set(`Venta rápida registrada: ${result.sale.transaction_number}`);
    } catch (err) {
      this.errorMessage.set(err instanceof Error ? err.message : 'Error al registrar la venta.');
    }
  }
}
