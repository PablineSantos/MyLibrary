import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-receita-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, InputTextModule],
  templateUrl: './receita-form.html',
  styleUrl: './receita-form.css',
})
export class ReceitaForm {
  
  receita: Recipe = {
    id: 0,
    nome: '',
    categoria: '',
    tempoPreparo: 1, // Regra do PDF: Mínimo 1 minuto 
    porcoes: 1,      // Regra do PDF: Mínimo 1 porção 
    ingredientes: [],
    modoPreparo: '',
    dataCadastro: new Date()
  };

  // Variável temporária para receber os ingredientes separados por vírgula
  ingredientesTexto: string = ''; 

  // Categorias exatas do Enum do documento
  categoriasAtuais = ['DOCE', 'SALGADO', 'BEBIDA', 'SOBREMESA'];

  constructor(
    private receitaService: RecipeService,
    private router: Router,
    private messageService: MessageService
  ) {}

  salvar() {
    // Transforma a string com vírgulas em uma lista (Array) de strings
    this.receita.ingredientes = this.ingredientesTexto
      .split(',')
      .map(ingrediente => ingrediente.trim())
      .filter(ingrediente => ingrediente.length > 0);

    this.receita.dataCadastro = new Date(); // Preenchimento automático
    this.receitaService.cadastarReceita(this.receita);
    this.exibirSucesso('Receita cadastrada com sucesso!');

    setTimeout(() => {
      this.router.navigate(['/receitas']); // Redireciona após salvar
    }, 1000);
  }

  cancelar() {
    this.router.navigate(['/receitas']); 
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