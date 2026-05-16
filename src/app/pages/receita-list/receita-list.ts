import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Reatividade no Angular
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

// Módulos do PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-receita-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService], 
  templateUrl: './receita-list.html',
  styleUrl: './receita-list.css',
})
export class ReceitaList implements OnInit, OnDestroy {
  receitas: Recipe[] = [];
  filtroNome: string = '';

  // Variáveis para controlar a busca em tempo real sem sobrecarregar o Backend
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    private receitaService: RecipeService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    // Detecta se há mudanças
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarReceitas();

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(termo => this.receitaService.listarReceitas(termo))
    ).subscribe({
      next: (dados) => {
        this.receitas = dados;
        // Força a atualização da tabela na busca em tempo real
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.exibirMensagem('error', 'Falha ao buscar receitas.');
      }
    });
  }

  ngOnDestroy() {
    // Limpa o sistema ao sair da página para não vazar memória
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  // Busca inicial sem filtros
carregarReceitas() {
    this.receitaService.listarReceitas().subscribe({
      next: (dados) => {
         this.receitas = dados;
         // Renderiza a lista na hora
         this.cdr.detectChanges(); 
      },
      error: (err) => this.exibirMensagem('error', 'Falha ao carregar a lista.')
    });
  }

  // É chamado pelo HTML a cada letra digitada 
  aplicarFiltroNome() {
    this.searchSubject.next(this.filtroNome);
  }

  // Exclusão conectada ao Backend
  excluirReceita(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja excluir esta receita permanentemente?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        // O .subscribe() espera o spring confirmar a exclusão
        this.receitaService.excluirReceita(id).subscribe({
          next: () => {
            this.exibirMensagem('success', 'Receita excluída com sucesso!');
            this.carregarReceitas(); // Pede o backend a lista atualizada
          },
          error: (err) => this.exibirMensagem('error', 'Erro ao excluir a receita.')
        });
      }
    });
  }
  
  detalhesReceita(id: number) {
    this.router.navigate(['/receita/detalhes', id]);
  }

  private exibirMensagem(tipo: string, texto: string) {
    this.messageService.add({ severity: tipo, summary: tipo === 'error' ? 'Erro' : 'Sucesso', detail: texto, life: 3000 });
  }
}