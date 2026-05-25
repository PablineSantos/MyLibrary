package com.pabline.senai.backend.repository;

import com.pabline.senai.backend.entity.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmprestimoRepository extends JpaRepository<Emprestimo,Long> {
    List<Emprestimo> findByLivroId(Long id );


}
