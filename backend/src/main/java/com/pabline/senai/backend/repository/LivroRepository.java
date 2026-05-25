package com.pabline.senai.backend.repository;

import com.pabline.senai.backend.entity.Emprestimo;
import com.pabline.senai.backend.entity.Livro;
import com.pabline.senai.backend.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    @Query("select l from Livro l where " +
            "(:termo is null  or lower(l.titulo)like lower (concat('%',:termo,'%'))or lower(l.autor)like lower(concat('%',:termo, '%' )))and " +
            "(:categoriaId is null or l.categoria.id = :categoriaId) and " +
            "(:status is null or l.status = :status)")
    List<Livro> buscarComfiltro(@Param("termo") String termo, @Param("categoriaId") Long categoriaId, @Param("status") Status status);
    boolean existsByCategoria_Id(Long categoria);



}
