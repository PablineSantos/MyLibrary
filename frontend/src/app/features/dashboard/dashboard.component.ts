import { CardModule } from 'primeng/card';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DashboardService } from '../../core/services/dashboard.service';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../core/base/base-component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit{
  dados: any = {
    totalLivros: 0,
    livrosDisponiveis: 0,
    livrosEmprestados: 0,
    emprestimosAtivos: 0,
    ultimosEmprestimos: []
  };

  constructor(
    private dashboardService: DashboardService,
    protected override cdr: ChangeDetectorRef
  ) {
    super(cdr);
  }
  ngOnInit(): void {
    this.dashboardService.obterEstatisticas().subscribe((res: any) => {
      this.dados = res;
      this.refresh();
    });
  }
}
