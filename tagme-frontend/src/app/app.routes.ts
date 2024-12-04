import { Routes } from '@angular/router';
import { FormComponent } from './modules/items/pages/form/form.component';
import { ListComponent } from './modules/items/pages/list/list.component';

export const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'create', component: FormComponent },
  { path: 'edit/:id', component: FormComponent }, // Certifique-se de que esta rota existe
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];
