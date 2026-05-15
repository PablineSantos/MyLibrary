import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// Módulos do PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-receita-details',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ConfirmDialogModule],
  providers: [ConfirmationService], // Necessário para o modal de exclusão
  templateUrl: './receita-details.html',
  styleUrl: './receita-details.css'
})
export class ReceitaDetails implements OnInit {
  
  receita: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private receitaService: RecipeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // 1. Pega o ID da barra de endereços do navegador
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      const id = Number(idParam);
      // 2. Busca a receita correspondente
      this.receita = this.receitaService.buscarReceitaPorId(id);
    }
  }

  // Botão para voltar
  voltar() {
    this.router.navigate(['/receitas']);
  }

  // Botão e confirmação de exclusão
  excluir() {
    if (this.receita) {
      this.confirmationService.confirm({
        message: `Tem certeza que deseja excluir a receita "${this.receita.nome}"?`,
        header: 'Confirmação de Exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Excluir',
        rejectLabel: 'Cancelar',
        acceptButtonStyleClass: 'p-button-danger',
        accept: () => {
          this.receitaService.excluirReceita(this.receita!.id); // Exclui do serviço
          
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Excluído', 
            detail: 'Receita excluída com sucesso!',
            life: 3000,
            closable: true
          });
          
          this.voltar(); // Retorna para a lista
        }
      });
    }
  }
}