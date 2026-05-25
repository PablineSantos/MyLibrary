package com.pabline.senai.backend.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class EmprestimoRequestDTO {

    @Size(min = 3, message = "O nome da categoria deve ter no mínimo 3 caracteres ")
    @NotBlank(message = "O nome da pessoa que está pegando emprestado é obrigatório")
    private String nome;

    @NotBlank(message = "O telefone da pessoa que está pegando emprestado é obrigatório")
    private String telefone;

    @FutureOrPresent(message = "A data de devolução prevista não pode estar no passado")
    @NotNull(message = "A data de devolução prevista é obrigatória")
    private LocalDate dataPrevistaDevolucao;

    @NotNull(message = "O ID do livro é obrigatório")
    private Long livroId;

    public EmprestimoRequestDTO() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public @FutureOrPresent LocalDate getDataPrevistaDevolucao() {
        return dataPrevistaDevolucao;
    }

    public void setDataPrevistaDevolucao(LocalDate dataPrevistaDevolucao) {
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
    }

    public Long getLivroId() {
        return livroId;
    }

    public void setLivroId(Long livroId) {
        this.livroId = livroId;
    }
}
