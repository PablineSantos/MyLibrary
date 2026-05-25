import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {Categoria} from '../../../core/models/categoria.model';
import {CategoriaService} from '../../../core/services/categoria.service';
import {FormCategoriaComponent} from '../form-categoria/form-categoria.component';
import {BaseComponent} from '../../../core/base/base-component';

@Component({
  selector: 'app-lista-categoria',
  standalone: true,
  providers: [ConfirmationService],
  imports: [TableModule, ButtonModule, DialogModule, CommonModule, FormCategoriaComponent, ConfirmDialogModule],
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent extends BaseComponent implements OnInit {
  categorias: Categoria[] = [];
  exibirModal = false;

  constructor(private categoriaService: CategoriaService, private confirmationService: ConfirmationService, protected override cdr: ChangeDetectorRef) {
    super(cdr);
  }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.listarTodas().subscribe(dados => {
      setTimeout(() => {
        this.categorias = dados;
        this.refresh();
      });
    });
  }

  deletar(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.categoriaService.deletar(id).subscribe(() => {
          this.carregarCategorias();
          this.refresh();
        });
      }
    });
  }

  abrirModal() {
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
    this.carregarCategorias();

  }
}
