import { Component, OnInit } from '@angular/core';
import { Button, ButtonDirective, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-tarefa-list',
  imports: [
    CommonModule,
    FormsModule, // Módulo de formulários
    TableModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    ConfirmDialogModule // Módulo da janela de confirmação
  ],
  providers: [ConfirmationService], // Fornecemos o serviço do PrimeNG para este componente
  templateUrl: './receita-list.html',
  styleUrl: './receita-list.css',
})
export class ReceitaList implements OnInit{
  receitas: Recipe[] = [];
  receitasFiltradas: Recipe[] = [];

  // Variáveis para os filtros (Data Binding)
  filtroTexto: string = '';
  filtroCategoria: string = '';

  constructor(private receitaService: RecipeService,
              private router: Router,
              private confirmationService: ConfirmationService) {
    this.receitas = this.receitaService.listarReceitas();
  }

  ngOnInit() {
    this.carregarReceitas();
  }

  carregarReceitas() {
    this.receitas = this.receitaService.listarReceitas();
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.receitasFiltradas = this.receitas.filter(r => {
      const matchesTexto = r.nome.toLowerCase().includes(this.filtroTexto.toLowerCase());
      const matchesCategoria = this.filtroCategoria ? r.categoria === this.filtroCategoria : true;
      
      return matchesTexto && matchesCategoria;
    });
  }

  /*marcarConcluida(id: number) {
    this.receitaService.alterarStatusConcluido(id);
    this.carregarTarefas(); // Atualiza a tela
  }*/

excluirReceita(id: number) {
    // Chamada do PrimeNG
    this.confirmationService.confirm({
      message: 'Deseja excluir a receita permanente?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger', // Deixa o botão de confirmar vermelho
      accept: () => {
        // Só executa se o usuário clicar em "Sim"
        this.receitaService.excluirReceita(id);
        this.carregarReceitas(); 
      }
    });
  }
  
  protected detalhesReceita(id: number) {
    this.router.navigate(['/receita/detalhes', id]);
  }




}
