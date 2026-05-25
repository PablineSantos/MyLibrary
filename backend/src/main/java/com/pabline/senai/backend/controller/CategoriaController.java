package com.pabline.senai.backend.controller;

import com.pabline.senai.backend.dto.CategoriaContagemResponseDTO;
import com.pabline.senai.backend.repository.CategoriaRepository;
import com.pabline.senai.backend.services.CategoriaService;
import com.pabline.senai.backend.dto.CategoriaDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("MyLibrary/Categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoriaDTO criarCategoria(@Valid @RequestBody CategoriaDTO categoriaDTO) {
        return categoriaService.criarCategoria(categoriaDTO);
    }

    @GetMapping
    public List<CategoriaContagemResponseDTO> listarCategoria() {
        return categoriaService.listarCategorias();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarCategoria(@PathVariable long id) {
        categoriaService.deletarCategoria(id);
    }
}
