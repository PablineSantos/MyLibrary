package com.pabline.senai.backend.repository;

import com.pabline.senai.backend.entity.Emprestimo;
import com.pabline.senai.backend.entity.Livro;
import com.pabline.senai.backend.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    @Query("SELECT l FROM Livro l WHERE " +
            "(:termo IS NULL OR LOWER(CAST(l.titulo AS text)) LIKE LOWER(CONCAT('%', CAST(:termo AS text), '%')) " +
            "OR LOWER(CAST(l.autor AS text)) LIKE LOWER(CONCAT('%', CAST(:termo AS text), '%'))) AND " +
            "(:categoriaId IS NULL OR l.categoria.id = :categoriaId) AND " +
            "(:status IS NULL OR l.status = :status)")
    List<Livro> buscarComfiltro(@Param("termo") String termo,
                                @Param("categoriaId") Long categoriaId,
                                @Param("status") Status status);

    boolean existsByCategoria_Id(Long categoria);

    long countByStatus(Status status);

}
