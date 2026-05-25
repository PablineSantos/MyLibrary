package com.pabline.senai.backend.services;

import com.pabline.senai.backend.dto.*;
import com.pabline.senai.backend.entity.Emprestimo;
import com.pabline.senai.backend.entity.Livro;
import com.pabline.senai.backend.enums.Status;
import com.pabline.senai.backend.repository.EmprestimoRepository;
import com.pabline.senai.backend.repository.LivroRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmprestimoService {

    private final EmprestimoRepository emprestimoRepository;
    private final LivroRepository livroRepository;

    public EmprestimoService(EmprestimoRepository emprestimoRepository, LivroRepository livroRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroRepository = livroRepository;
    }

    public EmprestimoResponseDTO emprestar(EmprestimoRequestDTO emprestimoRequestDTO) {
        Livro livro = livroRepository.findById(emprestimoRequestDTO.getLivroId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Livro não existe"));
        if (livro.getStatus() == Status.EMPRESTADO) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este livro já está emprestado e não pode ser pego no momento");
        }

        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setNome(emprestimoRequestDTO.getNome());
        emprestimo.setTelefone(emprestimoRequestDTO.getTelefone());
        emprestimo.setDataEmprestimo(LocalDate.now());
        emprestimo.setDataPrevistaDevolucao(emprestimoRequestDTO.getDataPrevistaDevolucao());
        emprestimo.setLivro(livro);
        livro.setStatus(Status.EMPRESTADO);
        livroRepository.save(livro);
        emprestimoRepository.save(emprestimo);
        return new EmprestimoResponseDTO(emprestimo);
    }

    public EmprestimoResponseDTO devolucao(Long id) {
        Emprestimo emprestimo = emprestimoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empréstimo não encontrado"));
        if (emprestimo.getDataDevolucao() != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este empréstimo já foi finalizado");
        }
        emprestimo.setDataDevolucao(LocalDate.now());
        Livro livro = emprestimo.getLivro();
        livro.setStatus(Status.DISPONIVEL);
        emprestimoRepository.save(emprestimo);
        livroRepository.save(livro);
        return new EmprestimoResponseDTO(emprestimo);
    }


    public List<EmprestimoAtrasadoResponseDTO> listarEmprestimosAtrasados() {
        List<Emprestimo> atrasados = emprestimoRepository.findByDataPrevistaDevolucaoBeforeAndDataDevolucaoIsNull(LocalDate.now());

        return atrasados.stream()
                .map(emprestimo -> new EmprestimoAtrasadoResponseDTO(emprestimo))
                .toList();
    }
}
