import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Adicionado
import { MatFormFieldModule } from '@angular/material/form-field'; // Material Form Field
import { MatInputModule } from '@angular/material/input'; // Material Input
import { MatButtonModule } from '@angular/material/button'; // Material Button
import { MatCardModule } from '@angular/material/card'; // Material Card
import { RouterModule } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [FormComponent, ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Necessário para Reactive Forms
    MatFormFieldModule, // Material Form Field
    MatInputModule, // Material Input
    MatButtonModule, // Material Button
    MatCardModule, // Material Card
    RouterModule, // Necessário para roteamento
  ],
})
export class ItemsModule {}
