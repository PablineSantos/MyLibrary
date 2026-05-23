package com.pabline.senai.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.ISBN;

public class LivroRequestDTO {
    @NotBlank(message = "O título é obrigatório")
    @Size(min = 2, max = 150, message = "O título deve ter entre 2 e 150 caracteres")
    private String titulo;

    @NotBlank(message = "O autor é obrigatório")
    private String autor;

    @NotBlank(message = "O ISBN é obrigatório.")
    @ISBN(type = ISBN.Type.ANY, message = "O formato do ISBN é inválido.")
    private String isbn;

    private Integer ano;

    @NotNull(message = "A categoria é obrigatória")
    private Long categoriaId;

    public LivroRequestDTO() {
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }
}