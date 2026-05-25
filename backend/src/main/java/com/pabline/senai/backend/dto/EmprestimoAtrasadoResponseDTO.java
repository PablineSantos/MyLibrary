package com.pabline.senai.backend.dto;

import com.pabline.senai.backend.entity.Emprestimo;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class EmprestimoAtrasadoResponseDTO {
    private String tituloLivro;
    private String nomePessoa;
    private LocalDate dataPrevistaDevolucao;
    private long diasDeAtraso;

    public EmprestimoAtrasadoResponseDTO() {
    }

    public EmprestimoAtrasadoResponseDTO(Emprestimo emprestimo) {
        this.tituloLivro = emprestimo.getLivro().getTitulo();
        this.nomePessoa = emprestimo.getNome();
        this.dataPrevistaDevolucao = emprestimo.getDataPrevistaDevolucao();

        this.diasDeAtraso = ChronoUnit.DAYS.between(emprestimo.getDataPrevistaDevolucao(), LocalDate.now());
    }

    public String getTituloLivro() {
        return tituloLivro;
    }

    public String getNomePessoa() {
        return nomePessoa;
    }

    public LocalDate getDataPrevistaDevolucao() {
        return dataPrevistaDevolucao;
    }

    public long getDiasDeAtraso() {
        return diasDeAtraso;
    }
}