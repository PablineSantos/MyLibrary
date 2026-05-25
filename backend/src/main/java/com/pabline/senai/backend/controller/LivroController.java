package com.pabline.senai.backend.controller;

import com.pabline.senai.backend.dto.EmprestimoResponseDTO;
import com.pabline.senai.backend.dto.LivroRequestDTO;
import com.pabline.senai.backend.dto.LivroResponseDTO;
import com.pabline.senai.backend.enums.Status;
import com.pabline.senai.backend.services.LivroService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("MyLibrary/Livros")
public class LivroController {

    private final LivroService livroService;

    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LivroResponseDTO cadastrarLivro(@Valid @RequestBody LivroRequestDTO livroRequestDTO) {
        return livroService.cadastrarLivro(livroRequestDTO);
    }

    @GetMapping
    public List<LivroResponseDTO> listarLivros(
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) String termo,
            @RequestParam(required = false) Status status) {
        return livroService.listarLivros(categoriaId, termo, status);
    }

    @GetMapping("/{id}/emprestimos")
    public List<EmprestimoResponseDTO> historicoDeEmprestimosPorLivro(@PathVariable Long id) {
        return livroService.historicoDeEmprestimosPorLivro(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarLivro(@PathVariable Long id) {
        livroService.deletarLivro(id);
    }
}