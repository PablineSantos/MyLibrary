package com.pabline.senai.backend.dto;

import com.pabline.senai.backend.entity.Emprestimo;

import java.time.LocalDate;

public class EmprestimoResponseDTO {

    private Long id;
    private String nomePessoa;
    private String telefone;
    private LocalDate dataEmprestimo;
    private LocalDate dataDevolucaoPrevista;
    private LocalDate dataDevolucaoEfetiva;

    private LivroResponseDTO livro;

    public EmprestimoResponseDTO() {
    }

    public EmprestimoResponseDTO(Emprestimo emprestimo) {
        this.id = emprestimo.getId();
        this.nomePessoa = emprestimo.getNome();
        this.telefone = emprestimo.getTelefone();
        this.dataEmprestimo = emprestimo.getDataEmprestimo();
        this.dataDevolucaoPrevista = emprestimo.getDataPrevistaDevolucao();
        this.dataDevolucaoEfetiva = emprestimo.getDataDevolucao();

        this.livro = new LivroResponseDTO(emprestimo.getLivro());
    }

    public Long getId() {
        return id;
    }

    public String getNomePessoa() {
        return nomePessoa;
    }

    public void setNomePessoa(String nomePessoa) {
        this.nomePessoa = nomePessoa;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public void setDataEmprestimo(LocalDate dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }

    public LocalDate getDataDevolucaoPrevista() {
        return dataDevolucaoPrevista;
    }

    public void setDataDevolucaoPrevista(LocalDate dataDevolucaoPrevista) {
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
    }

    public LocalDate getDataDevolucaoEfetiva() {
        return dataDevolucaoEfetiva;
    }

    public void setDataDevolucaoEfetiva(LocalDate dataDevolucaoEfetiva) {
        this.dataDevolucaoEfetiva = dataDevolucaoEfetiva;
    }

    public LivroResponseDTO getLivro() {
        return livro;
    }

    public void setLivro(LivroResponseDTO livro) {
        this.livro = livro;
    }
}