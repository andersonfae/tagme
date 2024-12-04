import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ItemService, Item } from '../../../../services/item.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ItemService], // Mantém o serviço fornecido no componente
})
export class ListComponent {
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
    this.itemService.getAll().subscribe({
      next: (data) => {
        this.items = data.map((item: any) => ({
          id: item.id, // Use `id` ao invés de `_id`
          title: item.title,
          description: item.description,
          photoUrl: item.photoUrl,
        }));
        console.log('Itens recebidos do backend:', this.items); // Log para verificar os dados
      },
      error: (err) => console.error('Erro ao buscar itens:', err),
    });
  }

  onDelete(id: string): void {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.itemService.delete(id).subscribe({
        next: () => {
          alert('Item excluído com sucesso!');
          this.fetchItems(); // Recarregar a lista
        },
        error: (err) => console.error('Erro ao excluir item:', err),
      });
    }
  }
}
