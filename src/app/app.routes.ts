import { Routes } from '@angular/router';
import { ReceitaList } from './pages/receita-list/receita-list';
import { ReceitaForm } from './pages/receita-form/receita-form';
import { ReceitaDetails } from './pages/receita-details/receita-details';

export const routes: Routes = [
  {path: '', redirectTo: '/receitas', pathMatch: 'full'},
  {path: 'receitas', component: ReceitaList},
  {path: 'receita/cadastrar', component: ReceitaForm},
  {path: 'receita/detalhes/:id', component: ReceitaDetails}
  
];
