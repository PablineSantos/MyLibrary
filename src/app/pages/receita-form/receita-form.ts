import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Módulos do PrimeNG
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
    id: 0, // Será ignorado pelo Spring no POST
    nome: '',
    categoria: '',
    tempoPreparo: 1,
    porcoes: 1,
    ingredientes: [],
    modoPreparo: '',
    dataCadastro: new Date() // Será sobrescrito pelo backend
  };

  ingredientesTexto: string = ''; 
  categoriasAtuais = ['DOCE', 'SALGADO', 'BEBIDA', 'SOBREMESA'];

  // Controle de estado para a interface
  salvando: boolean = false;

  constructor(
    private receitaService: RecipeService,
    private router: Router,
    private messageService: MessageService
  ) {}

  salvar() {
    // Trava o botão para evitar duplos cliques
    this.salvando = true;

    // Transforma o texto separado por vírgula em um Array
    this.receita.ingredientes = this.ingredientesTexto
      .split(',')
      .map(ingrediente => ingrediente.trim())
      .filter(ingrediente => ingrediente.length > 0);

    // Envia para o Spring Boot e aguarda a resposta
    this.receitaService.cadastrarReceita(this.receita).subscribe({
      next: (resposta) => {
        // O Backend devolve status created
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Sucesso', 
          detail: 'Receita cadastrada com sucesso!',
          life: 3000
        });
        
        setTimeout(() => {
          this.router.navigate(['/receitas']); 
        }, 1000);
      },
      error: (erro) => {
        // O Backend barra em alguma regra de negócio
        console.error('Erro ao salvar:', erro);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Ops!', 
          detail: 'Falha ao cadastrar a receita. Verifique os dados e tente novamente.',
          life: 4000
        });
        
        // Libera o botão para o usuário tentar arrumar e salvar de novo
        this.salvando = false; 
      }
    });
  }

  cancelar() {
    this.router.navigate(['/receitas']); 
  }
}