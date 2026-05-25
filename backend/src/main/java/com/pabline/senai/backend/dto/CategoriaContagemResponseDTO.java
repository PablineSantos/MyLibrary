package com.pabline.senai.backend.dto;

public class CategoriaContagemResponseDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Long totalLivros;

    public CategoriaContagemResponseDTO() {
    }

    public CategoriaContagemResponseDTO(Long id, String nome, String descricao, Long totalLivros) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.totalLivros = totalLivros;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getTotalLivros() {
        return totalLivros;
    }

    public void setTotalLivros(Long totalLivros) {
        this.totalLivros = totalLivros;
    }
}
