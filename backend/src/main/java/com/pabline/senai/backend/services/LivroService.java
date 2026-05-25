package com.pabline.senai.backend.services;

import com.pabline.senai.backend.dto.*;
import com.pabline.senai.backend.entity.Categoria;
import com.pabline.senai.backend.entity.Emprestimo;
import com.pabline.senai.backend.entity.Livro;
import com.pabline.senai.backend.enums.Status;
import com.pabline.senai.backend.repository.CategoriaRepository;
import com.pabline.senai.backend.repository.EmprestimoRepository;
import com.pabline.senai.backend.repository.LivroRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class LivroService {

    private final LivroRepository livroRepository;
    private final CategoriaRepository categoriaRepository;
    private final EmprestimoRepository emprestimoRepository;

    public LivroService(LivroRepository livroRepository, CategoriaRepository categoriaRepository, EmprestimoRepository emprestimoRepository) {
        this.livroRepository = livroRepository;
        this.categoriaRepository = categoriaRepository;
        this.emprestimoRepository = emprestimoRepository;
    }

    public LivroResponseDTO cadastrarLivro(LivroRequestDTO livroRequestDTO) {
        Categoria categoria = categoriaRepository.findById(livroRequestDTO.getCategoriaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não cadastrada."));

        Livro livro = new Livro();
        livro.setTitulo(livroRequestDTO.getTitulo());
        livro.setAutor(livroRequestDTO.getAutor());
        livro.setAno(livroRequestDTO.getAno());
        livro.setCategoria(categoria);
        livro.setIsbn(livroRequestDTO.getIsbn());
        livro.setStatus(Status.DISPONIVEL);

        livro = livroRepository.save(livro);

        return new LivroResponseDTO(livro);
    }

    public List<LivroResponseDTO> listarLivros(Long categoriaId, String termo, Status status) {
        List<Livro> livrosFiltrado = livroRepository.buscarComfiltro(termo, categoriaId, status);

        return livrosFiltrado.stream().map(livro -> new LivroResponseDTO(livro)).toList();
    }

    public void deletarLivro(Long id) {
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Livro não existe"));

        if (livro.getStatus() == Status.EMPRESTADO) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "O livro tem status emprestado, logo não pode ser deletado");
        }
        livroRepository.delete(livro);
    }

    public List<EmprestimoResponseDTO> historicoDeEmprestimosPorLivro(Long id) {
        Livro livro = livroRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Livro não existe"));
        List<Emprestimo> emprestimos = emprestimoRepository.findByLivroId(id);
        return emprestimos.stream().map(emprestimo -> new EmprestimoResponseDTO(emprestimo)).toList();
    }
}