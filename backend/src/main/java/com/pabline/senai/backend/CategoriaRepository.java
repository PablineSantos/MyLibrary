package com.pabline.senai.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    Boolean existsByNomeIgnoreCase(String nome);
}