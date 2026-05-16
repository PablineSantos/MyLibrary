import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  providers: [ConfirmationService], // Necessário para a janela de confirmação
  templateUrl: './receita-details.html',
  styleUrl: './receita-details.css'
})
export class ReceitaDetails implements OnInit {
  
  receita: Recipe | undefined;
  erroAoCarregar: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private receitaService: RecipeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    // Define 
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      const id = Number(idParam);
      
      this.receitaService.buscarReceitaPorId(id).subscribe({
        next: (dadosDoBackend) => {
          this.receita = dadosDoBackend;
          // Força o Angular a desenhar os detalhes
          this.cdr.detectChanges(); 
        },
        error: (erro) => {
          console.error('Erro ao buscar detalhes da receita:', erro);
          this.erroAoCarregar = true;
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Receita não encontrada.' });
          
          // Se der erro mostra a tela de erro
          this.cdr.detectChanges();
        }
      });
    }
  }

  voltar() {
    this.router.navigate(['/receitas']);
  }

  excluir() {
    if (this.receita) {
      this.confirmationService.confirm({
        message: `Tem certeza que deseja excluir a receita "${this.receita.nome}" permanentemente?`,
        header: 'Confirmação de Exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim, excluir',
        rejectLabel: 'Cancelar',
        acceptButtonStyleClass: 'p-button-danger',
        accept: () => {
          
          // Assinamos (subscribe) a requisição DELETE do Backend
          this.receitaService.excluirReceita(this.receita!.id).subscribe({
            next: () => {
              this.messageService.add({ 
                severity: 'success', 
                summary: 'Excluído', 
                detail: 'Receita excluída com sucesso!',
                life: 3000
              });
              
              // Só volta para a lista DEPOIS que o backend confirmar a exclusão
              this.voltar(); 
            },
            error: (erro) => {
              console.error('Erro ao excluir:', erro);
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao tentar excluir a receita.' });
            }
          });
        }
      });
    }
  }
}