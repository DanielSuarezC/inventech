import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegulationsService } from '../../../core/services/regulations.service';
import { RegulationDocument, DocumentCategory } from '../../../core/models/regulation-document.model';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { AlertComponent } from '../../../shared/ui/alert/alert.component';

@Component({
  selector: 'app-document-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CardComponent, ButtonComponent, InputComponent, AlertComponent],
  templateUrl: './document-admin.component.html',
})
export class DocumentAdminComponent implements OnInit {
  readonly form: FormGroup;
  readonly documents = signal<RegulationDocument[]>([]);
  readonly categories = signal<DocumentCategory[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedDoc = signal<RegulationDocument | null>(null);
  readonly showForm = signal(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly regulations: RegulationsService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      documentType: [''],
      version: [''],
      author: [''],
      status: ['publicado'],
      tags: [''],
      url: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadDocuments();
    await this.loadCategories();
  }

  private async loadDocuments(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const docs = await this.regulations.list();
      this.documents.set(docs);
    } catch (err) {
      this.error.set(`Error cargando documentos: ${err}`);
    } finally {
      this.loading.set(false);
    }
  }

  private async loadCategories(): Promise<void> {
    try {
      const cats = await this.regulations.listCategories();
      if (cats.length === 0) {
        this.error.set('No hay categorías configuradas. Contacta al administrador.');
      } else {
        this.categories.set(cats);
      }
    } catch (err) {
      this.error.set(`Error cargando categorías: ${err}`);
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) return;

    this.loading.set(true);
    this.error.set(null);

    try {
      const formValue = this.form.value;
      const tagsArray = formValue.tags
        ? (typeof formValue.tags === 'string'
            ? formValue.tags.split(',').map((t: string) => t.trim())
            : formValue.tags)
        : [];

      const doc = {
        title: formValue.title,
        category: formValue.category,
        description: formValue.description || '',
        documentType: formValue.documentType || undefined,
        version: formValue.version || undefined,
        author: formValue.author || undefined,
        status: formValue.status,
        tags: tagsArray,
        url: formValue.url,
      };

      if (this.selectedDoc()) {
        await this.regulations.update(this.selectedDoc()!.id, doc);
      } else {
        await this.regulations.create(doc);
      }

      this.form.reset();
      this.selectedDoc.set(null);
      this.showForm.set(false);
      await this.loadDocuments();
    } catch (err) {
      this.error.set(`Error guardando documento: ${err}`);
    } finally {
      this.loading.set(false);
    }
  }

  editDocument(doc: RegulationDocument): void {
    this.selectedDoc.set(doc);
    this.form.patchValue({
      title: doc.title,
      category: doc.category,
      description: doc.description,
      documentType: doc.documentType,
      version: doc.version,
      author: doc.author,
      status: doc.status,
      tags: doc.tags?.join(', '),
      url: doc.url,
    });
    this.showForm.set(true);
  }

  cancelEdit(): void {
    this.form.reset();
    this.selectedDoc.set(null);
    this.showForm.set(false);
  }

  async deleteDocument(doc: RegulationDocument): Promise<void> {
    if (!confirm(`¿Estás seguro de eliminar "${doc.title}"?`)) return;

    this.loading.set(true);
    this.error.set(null);

    try {
      await this.regulations.remove(doc.id);
      await this.loadDocuments();
    } catch (err) {
      this.error.set(`Error eliminando documento: ${err}`);
    } finally {
      this.loading.set(false);
    }
  }

  newDocument(): void {
    this.form.reset({ status: 'publicado' });
    this.selectedDoc.set(null);
    this.showForm.set(true);
  }
}
