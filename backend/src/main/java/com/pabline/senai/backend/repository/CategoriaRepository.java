package com.pabline.senai.backend.repository;

import com.pabline.senai.backend.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.pabline.senai.backend.dto.CategoriaContagemResponseDTO;

import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    Boolean existsByNomeIgnoreCase(String nome);

    @Query("select new com.pabline.senai.backend.dto.CategoriaContagemResponseDTO(" +
            " c.id, c.nome, c.descricao, count(l.id))" +
            " from Categoria  c left join Livro l on l.categoria = c" +
            " group by c.id, c.nome, c.descricao")
    List<CategoriaContagemResponseDTO> buscarCategoriasComContagem();
}