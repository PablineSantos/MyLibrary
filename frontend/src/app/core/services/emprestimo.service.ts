import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {
  private apiUrl = 'http://localhost:8080/MyLibrary/Emprestimos';

  constructor(private http: HttpClient) {}

  listarEmprestimosAtrasados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/atrasados`);
  }

  emprestar(emprestimoDTO: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, emprestimoDTO);
  }

  devolucao(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/devolver`, {});
  }
}
