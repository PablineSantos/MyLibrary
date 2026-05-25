package com.pabline.senai.backend.dto;

import com.pabline.senai.backend.entity.Livro;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class EmprestimoRequestDTO {

    @Size(min = 3, message = "O nome da categoria deve ter no mínimo 3 caracteres ")
    @NotBlank(message = "O nome da pessoa que está pegando emprestado é obrigatório")
    private String nome;

    @Pattern(regexp = "^\\d{10,11}$", message = "O telefone deve conter apenas números, tendo 10 ou 11 dígitos (com o DDD)")
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

    public Long getLivro() {
        return livroId;
    }

    public void setLivro(Long livroId) {
        this.livroId = livroId;
    }
}
