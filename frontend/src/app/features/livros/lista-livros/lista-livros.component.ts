import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '../../../core/base/base-component';

import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { DrawerModule } from 'primeng/drawer';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LivroRequest } from '../../../core/models/livro.model';
import { LivroService } from '../../../core/services/livro.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { EmprestimoService } from '../../../core/services/emprestimo.service';

@Component({
  selector: 'app-lista-livros',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [
    CommonModule, FormsModule, ToolbarModule, TableModule, ButtonModule,
    TabsModule, SelectModule, InputTextModule, TagModule, DrawerModule,
    DialogModule, InputMaskModule, DatePickerModule, ConfirmDialogModule, ToastModule
  ],
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent extends BaseComponent implements OnInit {
  livros: any[] = [];
  atrasados: any[] = [];
  categorias: any[] = [];
  termoBusca: string = '';
  categoriaSelecionada: number | undefined;
  statusSelecionado: string | undefined;

  statusOptions = [{label: 'Disponível', value: 'DISPONIVEL'}, {label: 'Emprestado', value: 'EMPRESTADO'}];

  sidebarVisivel = false;
  exibirModalEmprestimo = false;
  livroSelecionado: any = null;
  historicoEmprestimos: any[] = [];
  hoje: Date = new Date();

  formularioEmprestimo :any = { livroId: 0, nome: '', telefone: '', dataPrevistaDevolucao: '' };
  exibirModalCadastro = false;
  formularioLivro: LivroRequest = { titulo: '', autor: '', isbn: '', ano: new Date().getFullYear(), categoriaId: 0 };

  constructor(
    private livroService: LivroService,
    private categoriaService: CategoriaService,
    private emprestimoService: EmprestimoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    protected override cdr: ChangeDetectorRef
  ) {
    super(cdr);
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.categoriaService.listarTodas().subscribe((d: any) => {
      this.categorias = d;
      this.refresh();
    });
    this.filtrarLivros();
    this.carregarAtrasados();
  }

  filtrarLivros() {
    this.livroService.listar(this.termoBusca, this.categoriaSelecionada, this.statusSelecionado)
      .subscribe((d: any) => {
        this.livros = d;
        this.refresh();
      });
  }

  carregarAtrasados() {
    this.emprestimoService.listarEmprestimosAtrasados().subscribe((d: any) => {
      this.atrasados = d;
      this.refresh();
    });
  }

  abrirDetalhes(livro: any) {
    this.livroSelecionado = livro;
    this.sidebarVisivel = true;
    this.livroService.getHistorico(livro.id).subscribe((d: any) => {
      this.historicoEmprestimos = d;
      this.refresh();
    });
  }

  abrirModalEmprestimo(livro: any) {
    this.livroSelecionado = livro;
    this.formularioEmprestimo = { livroId: livro.id, nome: '', telefone: '', dataPrevistaDevolucao: '' };
    this.exibirModalEmprestimo = true;
    this.refresh();
  }

  confirmarEmprestimo() {
    if (!this.formularioEmprestimo.nome || !this.formularioEmprestimo.dataPrevistaDevolucao) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha o Nome e a Data de Devolução!' });
      return;
    }

    const payload = { ...this.formularioEmprestimo };

    if (payload.dataPrevistaDevolucao instanceof Date) {
      payload.dataPrevistaDevolucao = payload.dataPrevistaDevolucao.toISOString().split('T')[0] as any;
    }

    this.emprestimoService.emprestar(payload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Emprestado!' });
        this.exibirModalEmprestimo = false;
        this.carregarDados();
        this.refresh();
      },
      error: (err) => {
        console.error('Erro na requisição:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error?.message || 'Falha ao realizar empréstimo. Verifique os dados!'
        });
      }
    });
  }

  devolverLivro(id: number) {
    this.emprestimoService.devolucao(id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Devolvido!' });
      this.carregarDados();
      this.refresh();
    });
  }

  deletarLivro(id: number) {
    this.confirmationService.confirm({
      message: 'Confirmar exclusão?',
      accept: () => {
        this.livroService.deletar(id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Deletado' });
          this.filtrarLivros();
          this.refresh();
        });
      }
    });
  }

  abrirModalCadastro() {
    this.formularioLivro = { titulo: '', autor: '', isbn: '', ano: new Date().getFullYear(), categoriaId: 0 };
    this.exibirModalCadastro = true;
    this.refresh();
  }

  salvarNovoLivro() {
    if (!this.formularioLivro.titulo || !this.formularioLivro.categoriaId) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Título e Categoria são obrigatórios!' });
      return;
    }

    this.livroService.cadastrar(this.formularioLivro).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Livro cadastrado com sucesso!' });
        this.exibirModalCadastro = false;
        this.carregarDados();
        this.refresh();
      },
      error: () => {
        console.error('Falha ao cadastrar o livro');
      }
    });
  }
}
