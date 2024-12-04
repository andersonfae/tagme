import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../../../services/item.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ItemService],
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  selectedFile: File | null = null;
  isEditMode = false; // Verifica se estamos no modo de edição
  itemId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      photo: [null],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.itemId = params.get('id');
      console.log('ID capturado na URL:', this.itemId); // Log para verificar o ID
      if (this.itemId) {
        this.isEditMode = true;
        this.loadItemData();
      }
    });
  }

  // Carregar dados do item para edição
  loadItemData(): void {
    if (!this.itemId) return;

    this.itemService.getById(this.itemId).subscribe({
      next: (item) => {
        this.form.patchValue({
          title: item.title,
          description: item.description,
        });
      },
      error: (err) => {
        console.error('Erro ao carregar item:', err);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      console.log('Arquivo selecionado:', this.selectedFile);
    }
  }

  onSubmit(): void {
    const formData = new FormData();

    // Adicionar apenas os campos que foram preenchidos
    const title = this.form.get('title')?.value;
    const description = this.form.get('description')?.value;

    if (title) {
      formData.append('title', title);
    }
    if (description) {
      formData.append('description', description);
    }
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    if (this.isEditMode && this.itemId) {
      // Atualizar item usando PATCH
      this.itemService.update(this.itemId, formData).subscribe({
        next: () => {
          alert('Item atualizado com sucesso!');
          this.router.navigate(['/list']); // Voltar para a lista
        },
        error: (err) => {
          console.error('Erro ao atualizar item:', err);
        },
      });
    } else {
      // Criar novo item
      this.itemService.create(formData).subscribe({
        next: () => {
          alert('Item criado com sucesso!');
          this.router.navigate(['/list']); // Voltar para a lista
        },
        error: (err) => {
          console.error('Erro ao criar item:', err);
        },
      });
    }
  }
}
