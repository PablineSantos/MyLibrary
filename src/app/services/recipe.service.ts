import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  private receitas: Recipe[] = [];
  private proximoId = 6;

  constructor() {
    // Adiciona receitas teste
    this.receitas = 
    [
      /*{
      id: 1,
      titulo: "Estudar Angular",
      descricao: "Revisar material de Data Binding",
      categoria: "Estudos",
      prioridade: "Alta",
      concluida: false,
      dataCriacao: new Date("2024-04-20")
      },
      {
      id: 2,
      titulo: "Fazer compras",
      descricao: "Arroz, feijão, café",
      categoria: "Pessoal",
      prioridade: "Média",
      concluida: true,
      dataCriacao: new Date("2024-04-21"),
      dataConclusao: new Date("2024-04-22")
      },
      {
      id: 3,
      titulo: "Reunião com time",
      descricao: "Daily às 10h",
      categoria: "Trabalho",
      prioridade: "Alta",
      concluida: false,
      dataCriacao: new Date("2024-04-23")
      },
      {
      id: 4,
      titulo: "Ler documentação TypeScript",
      descricao: "Capítulos 5 e 6",
      categoria: "Estudos",
      prioridade: "Baixa",
      concluida: false,
      dataCriacao: new Date("2024-04-24")
      },
      {
      id: 5,
      titulo: "Ligar para dentista",
      descricao: "Agendar consulta",
      categoria: "Pessoal",
      prioridade: "Média",
      concluida: false,
      dataCriacao: new Date("2024-04-25")
      }*/
    ];
  }

  cadastarReceita(receita: Recipe): Recipe {
    const novaReceita: Recipe = {
      ...receita,
      id: this.proximoId++
    };

    this.receitas.push(novaReceita);

    return novaReceita;
  }

  listarReceitas(): Recipe[] {
    return this.receitas;
  }

  buscarReceitaPorId(id: number): Recipe | undefined {
    // Busca com lambda, t desde que id de t for igual a id
    return this.receitas.find(r => r.id === id);
  }

  atualizarReceita(id: number, receitaAtualizada: Recipe): Recipe | undefined {
    // Busca o index ou id da tarefa
    const index = this.receitas.findIndex(r => r.id === id);
    if (index !== -1) {
      this.receitas[index] = { ...receitaAtualizada, id };
      return this.receitas[index];
    }
    return undefined;
  }

  excluirReceita(id: number): boolean {
    const index = this.receitas.findIndex(r => r.id === id);
    if (index !== -1) {
      this.receitas.splice(index, 1);
      return true;
    }
    return false;
  }

  /*alterarStatusConcluido(id: number): void {
  const receita = this.buscarReceitaPorId(id);
  if (receita) {
    receita.concluida = !receita.concluida;
    // Regra de negócio do PDF 
    receita.dataConclusao = receita.concluida ? new Date() : undefined;
  }
}*/  

}