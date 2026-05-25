package com.pabline.senai.backend.dto;

import java.util.List;

public class DashboardResponseDTO {
    private Long totalLivros;
    private Long livrosDisponiveis;
    private Long livrosEmprestados;
    private Long emprestimosAtivos;
    private List<EmprestimoResponseDTO> ultimosEmprestimos;

    public DashboardResponseDTO(Long totalLivros, Long livrosDisponiveis, Long livrosEmprestados, Long emprestimosAtivos, List<EmprestimoResponseDTO> ultimosEmprestimos) {
        this.totalLivros = totalLivros;
        this.livrosDisponiveis = livrosDisponiveis;
        this.livrosEmprestados = livrosEmprestados;
        this.emprestimosAtivos = emprestimosAtivos;
        this.ultimosEmprestimos = ultimosEmprestimos;
    }

    public Long getTotalLivros() {
        return totalLivros;
    }

    public void setTotalLivros(Long totalLivros) {
        this.totalLivros = totalLivros;
    }

    public Long getLivrosDisponiveis() {
        return livrosDisponiveis;
    }

    public void setLivrosDisponiveis(Long livrosDisponiveis) {
        this.livrosDisponiveis = livrosDisponiveis;
    }

    public Long getLivrosEmprestados() {
        return livrosEmprestados;
    }

    public void setLivrosEmprestados(Long livrosEmprestados) {
        this.livrosEmprestados = livrosEmprestados;
    }

    public Long getEmprestimosAtivos() {
        return emprestimosAtivos;
    }

    public void setEmprestimosAtivos(Long emprestimosAtivos) {
        this.emprestimosAtivos = emprestimosAtivos;
    }

    public List<EmprestimoResponseDTO> getUltimosEmprestimos() {
        return ultimosEmprestimos;
    }

    public void setUltimosEmprestimos(List<EmprestimoResponseDTO> ultimosEmprestimos) {
        this.ultimosEmprestimos = ultimosEmprestimos;
    }
}
