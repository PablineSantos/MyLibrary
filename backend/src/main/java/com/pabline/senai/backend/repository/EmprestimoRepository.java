package com.pabline.senai.backend.repository;

import com.pabline.senai.backend.entity.Emprestimo;
import com.pabline.senai.backend.entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByLivroId(Long id);

    long countByDataDevolucaoIsNull();


    List<Emprestimo> findAllByOrderByDataEmprestimoDesc();
<<<<<<< HEAD


    List<Emprestimo> findByDataPrevistaDevolucaoBeforeAndDataDevolucaoIsNull(LocalDate data);
=======
>>>>>>> ff4f3f65e7189337fd4e47d84c4520fb3c89b115
}
