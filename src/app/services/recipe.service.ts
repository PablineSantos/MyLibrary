import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  // Injetamos o HttpClient
  private http = inject(HttpClient);
  
  // A URL base que a Pabline configurou no Controller
  private apiUrl = 'http://localhost:8080/api/receitas';

  // Endpoint 1 e 2: Listar todas OU buscar por nome
  listarReceitas(nomeBusca?: string): Observable<Recipe[]> {
    let parametros = new HttpParams();
    
    // Se o usuário digitou algo na busca, coloca ?nome=valor na URL
    if (nomeBusca) {
      parametros = parametros.set('nome', nomeBusca);
    }
    
    return this.http.get<Recipe[]>(this.apiUrl, { params: parametros });
  }

  // Endpoint 2: Buscar por ID para a tela de Detalhes
  buscarReceitaPorId(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  // Endpoint 3: Criar uma nova receita
  cadastrarReceita(receita: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, receita);
  }

  // Endpoint 4: Excluir receita
  excluirReceita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}