export type Status = 'DISPONIVEL' | 'EMPRESTADO';

export interface CategoriaResumo {
  id: number;
  nome: string;
}

export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
  status: Status;
  categoria: CategoriaResumo;
}

export interface LivroRequest {
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
  categoriaId: number;
}
