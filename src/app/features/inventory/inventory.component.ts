import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { InventoryMovementsService } from '../../core/services/inventory-movements.service';
import { Product, Category } from '../../core/models/product.model';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { InputComponent } from '../../shared/ui/input/input.component';
import { CardComponent } from '../../shared/ui/card/card.component';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';
import { AlertComponent } from '../../shared/ui/alert/alert.component';
import { LoadingComponent } from '../../shared/ui/loading/loading.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
    BadgeComponent,
    AlertComponent,
    LoadingComponent,
    EmptyStateComponent,
  ],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly errorMessage = signal('');
  readonly products = signal<Product[]>([]);
  readonly categories = signal<Category[]>([]);
  readonly search = signal('');
  readonly formOpen = signal(false);
  readonly editingId = signal<string | null>(null);

  readonly form = this.fb.group({
    name: ['', [Validators.required]],
    sku: [''],
    categoryId: [''],
    costPrice: [0, [Validators.required, Validators.min(0)]],
    salePrice: [0, [Validators.required, Validators.min(0)]],
    trackInventory: [true],
    stock: [0, [Validators.min(0)]],
    minStock: [0, [Validators.min(0)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly movementsService: InventoryMovementsService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  async loadAll(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set('');
    try {
      const [products, categories] = await Promise.all([
        this.productsService.list(this.search()),
        this.categoriesService.list(),
      ]);
      this.products.set(products);
      this.categories.set(categories);
    } catch (err) {
      this.errorMessage.set(this.messageFor(err));
    } finally {
      this.loading.set(false);
    }
  }

  categoryName(id: string | null): string {
    if (!id) return 'Sin categoría';
    return this.categories().find((c) => c.id === id)?.name ?? 'Sin categoría';
  }

  isLowStock(product: Product): boolean {
    return product.track_inventory && product.stock <= product.min_stock;
  }

  openCreateForm(): void {
    this.editingId.set(null);
    this.form.reset({
      name: '',
      sku: '',
      categoryId: '',
      costPrice: 0,
      salePrice: 0,
      trackInventory: true,
      stock: 0,
      minStock: 0,
    });
    this.formOpen.set(true);
  }

  openEditForm(product: Product): void {
    this.editingId.set(product.id);
    this.form.reset({
      name: product.name,
      sku: product.sku ?? '',
      categoryId: product.category_id ?? '',
      costPrice: product.cost_price,
      salePrice: product.sale_price,
      trackInventory: product.track_inventory,
      stock: product.stock,
      minStock: product.min_stock,
    });
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    const raw = this.form.getRawValue();
    const input = {
      name: raw.name!,
      sku: raw.sku || null,
      description: null,
      category_id: raw.categoryId || null,
      cost_price: raw.costPrice!,
      sale_price: raw.salePrice!,
      track_inventory: raw.trackInventory!,
      stock: raw.stock ?? 0,
      min_stock: raw.minStock ?? 0,
    };

    try {
      if (this.editingId()) {
        await this.productsService.update(this.editingId()!, input);
      } else {
        await this.productsService.create(input);
      }
      this.formOpen.set(false);
      await this.loadAll();
    } catch (err) {
      this.errorMessage.set(this.messageFor(err));
    } finally {
      this.saving.set(false);
    }
  }

  async removeProduct(product: Product): Promise<void> {
    if (!confirm(`¿Eliminar el producto "${product.name}"?`)) return;
    try {
      await this.productsService.remove(product.id);
      await this.loadAll();
    } catch (err) {
      this.errorMessage.set(this.messageFor(err));
    }
  }

  async adjustStock(product: Product, type: 'in' | 'out'): Promise<void> {
    const quantityStr = prompt(type === 'in' ? 'Cantidad a ingresar:' : 'Cantidad a retirar:', '1');
    if (!quantityStr) return;
    const quantity = Number(quantityStr);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      this.errorMessage.set('La cantidad debe ser un número positivo.');
      return;
    }

    try {
      await this.movementsService.registerMovement(product.id, type, quantity, 'manual', null);
      await this.loadAll();
    } catch (err) {
      this.errorMessage.set(this.messageFor(err));
    }
  }

  private messageFor(err: unknown): string {
    if (err instanceof Error) return err.message;
    return 'Ocurrió un error inesperado. Verifica tu conexión con Supabase.';
  }
}
