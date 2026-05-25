import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Livro, LivroRequest} from '../models/livro.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'http://localhost:8080/MyLibrary/Livros';

  constructor(private http: HttpClient) {}

  listar(termo?: string, categoriaId?: number, status?: string): Observable<Livro[]> {
    let params = new HttpParams();

    if (termo) params = params.set('termo', termo);
    if (categoriaId) params = params.set('categoriaId', categoriaId.toString());
    if (status) params = params.set('status', status);

    return this.http.get<Livro[]>(this.API, { params });
  }

  cadastrar(livro: LivroRequest): Observable<Livro> {
    return this.http.post<Livro>(this.API, livro);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  getHistorico(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/${id}/emprestimos`);
  }
}
