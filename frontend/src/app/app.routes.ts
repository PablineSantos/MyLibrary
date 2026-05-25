import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ListaLivrosComponent } from './features/livros/lista-livros/lista-livros.component';
import { ListaCategoriaComponent } from './features/categorias/lista-categoria/lista-categoria.component';
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'livros', component: ListaLivrosComponent },
  { path: 'categorias', component: ListaCategoriaComponent },

  { path: '**', redirectTo: 'dashboard' }
];
