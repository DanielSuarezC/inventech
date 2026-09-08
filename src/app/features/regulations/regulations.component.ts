import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegulationsService } from '../../core/services/regulations.service';
import { RegulationDocument } from '../../core/models/regulation-document.model';
import { LoadingComponent } from '../../shared/ui/loading/loading.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';
import { AlertComponent } from '../../shared/ui/alert/alert.component';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-regulations',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent, EmptyStateComponent, AlertComponent, BadgeComponent],
  templateUrl: './regulations.component.html',
})
export class RegulationsComponent implements OnInit {
  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly documents = signal<RegulationDocument[]>([]);
  readonly search = signal('');
  readonly categoryFilter = signal('');

  readonly categories = computed(() =>
    Array.from(new Set(this.published().map((d) => d.category)))
  );

  readonly published = computed(() =>
    this.documents().filter((doc) => doc.status === 'publicado')
  );

  readonly filtered = computed(() =>
    this.published().filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(this.search().toLowerCase());
      const matchesCategory = !this.categoryFilter() || doc.category === this.categoryFilter();
      return matchesSearch && matchesCategory;
    })
  );

  constructor(private readonly regulationsService: RegulationsService) {}

  ngOnInit(): void {
    this.load();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set('');
    try {
      this.documents.set(await this.regulationsService.list());
    } catch (err) {
      this.errorMessage.set(
        err instanceof Error
          ? err.message
          : 'No fue posible cargar la normatividad. Verifica la conexión con Supabase.'
      );
    } finally {
      this.loading.set(false);
    }
  }
}
