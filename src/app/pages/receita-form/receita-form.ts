import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // ActivatedRoute é a novidade aqui!

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { MessageService } from 'primeng/api';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-receita-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './receita-form.html',
  styleUrl: './receita-form.css',
})

export class ReceitaForm implements OnInit {
  
  // Criamos uma tarefa vazia padrão para começar
  receita: Recipe = {
    id: 0,
    nome: '',
    categoria: '',
    tempoPreparo: 0, 
    porcoes: 0,
    ingredientes: [],
    modoPreparo: '',
    dataCadastro: new Date()
  };

  // Variável para sabermos em qual modo a tela está
  isEdicao: boolean = false;

  // Listas para os selects (boa prática colocar aqui em vez de chumbar no HTML)
  categoriasAtuais = ['Doce', 'Salgado', 'Bebida', 'Sobremesa'];


  constructor(
    private receitaService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // Pegamos o ID que vem na rota (se existir)
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.isEdicao = true; // Tem ID, então é edição
      const id = Number(idParam);
      const receitaEncontrada = this.receitaService.buscarReceitaPorId(id);
      
      if (receitaEncontrada) {
        // Usamos os três pontinhos (...) para fazer uma CÓPIA da tarefa.
        // Assim, se o usuário desistir de editar, não estragamos o dado original no Service.
        this.receita = { ...receitaEncontrada };
      }
    }
  }

salvar() {
  if (this.isEdicao) {
    this.receitaService.atualizarReceita(this.receita.id, this.receita);
    this.exibirSucesso('Receita atualizada!');
  } else {
    this.receita.dataCadastro = new Date();
    this.receitaService.cadastarReceita(this.receita);
    this.exibirSucesso('Receita cadastrada!');
  }

  // O setTimeout dá o tempo exato para o Toast aparecer antes de trocar a tela
  setTimeout(() => {
    this.router.navigate(['/receitas']);
  }, 1000);
}

cancelar() {
  // Redireciona para a tela raiz
  this.router.navigate(['/']); 
}

exibirSucesso(mensagem: string) {
  this.messageService.add({ 
    severity: 'success', 
    summary: 'Sucesso', 
    detail: mensagem,
    life: 3000,
    closable: true 
  });
}
}