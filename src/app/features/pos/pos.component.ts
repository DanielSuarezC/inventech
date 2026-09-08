import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../core/services/products.service';
import { SalesService } from '../../core/services/sales.service';
import { Product } from '../../core/models/product.model';
import { CartLine } from '../../core/models/sale.model';
import { PAYMENT_METHODS } from '../../core/data/payment-methods.data';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CardComponent } from '../../shared/ui/card/card.component';
import { AlertComponent } from '../../shared/ui/alert/alert.component';
import { LoadingComponent } from '../../shared/ui/loading/loading.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, CardComponent, AlertComponent, LoadingComponent, EmptyStateComponent],
  templateUrl: './pos.component.html',
})
export class PosComponent implements OnInit {
  readonly loading = signal(true);
  readonly processing = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly products = signal<Product[]>([]);
  readonly search = signal('');
  readonly cart = signal<CartLine[]>([]);
  readonly paymentMethod = signal(PAYMENT_METHODS[0]);
  readonly paymentMethods = PAYMENT_METHODS;

  constructor(
    private readonly productsService: ProductsService,
    private readonly salesService: SalesService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set('');
    try {
      this.products.set(await this.productsService.list(this.search()));
    } catch (err) {
      this.errorMessage.set(this.messageFor(err));
    } finally {
      this.loading.set(false);
    }
  }

  get total(): number {
    return this.cart().reduce((sum, line) => sum + line.unit_price * line.quantity, 0);
  }

  addToCart(product: Product): void {
    const existing = this.cart().find((line) => line.product_id === product.id);

    if (existing) {
      if (product.track_inventory && existing.quantity >= product.stock) {
        this.errorMessage.set(`No hay más stock disponible de "${product.name}".`);
        return;
      }
      this.cart.update((lines) =>
        lines.map((line) => (line.product_id === product.id ? { ...line, quantity: line.quantity + 1 } : line))
      );
      return;
    }

    if (product.track_inventory && product.stock <= 0) {
      this.errorMessage.set(`"${product.name}" no tiene stock disponible.`);
      return;
    }

    this.cart.update((lines) => [
      ...lines,
      {
        product_id: product.id,
        name: product.name,
        unit_price: product.sale_price,
        quantity: 1,
        track_inventory: product.track_inventory,
        available_stock: product.stock,
      },
    ]);
  }

  /** Usado por el módulo Scanner para agregar productos escaneados directamente al carrito. */
  addByBarcode(product: Product): void {
    this.addToCart(product);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeLine(productId);
      return;
    }
    this.cart.update((lines) => lines.map((line) => (line.product_id === productId ? { ...line, quantity } : line)));
  }

  removeLine(productId: string): void {
    this.cart.update((lines) => lines.filter((line) => line.product_id !== productId));
  }

  clearCart(): void {
    this.cart.set([]);
  }

  async confirmSale(): Promise<void> {
    if (this.cart().length === 0) return;

    this.processing.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      const result = await this.salesService.createSale(this.cart(), this.paymentMethod());
      this.successMessage.set(`Venta registrada: ${result.sale.transaction_number}`);
      this.clearCart();
      await this.loadProducts();
    } catch (err) {
      this.errorMessage.set(this.messageFor(err));
    } finally {
      this.processing.set(false);
    }
  }

  private messageFor(err: unknown): string {
    if (err instanceof Error) return err.message;
    return 'Ocurrió un error inesperado. Verifica tu conexión con Supabase.';
  }
}
