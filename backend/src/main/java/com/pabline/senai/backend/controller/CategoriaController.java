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

    public final CategoriaService categoriaService;
    private final CategoriaRepository categoriaRepository;

    public CategoriaController(CategoriaService categoriaService, CategoriaRepository categoriaRepository) {
        this.categoriaService = categoriaService;
        this.categoriaRepository = categoriaRepository;
    }

    @PostMapping
    public ResponseEntity<CategoriaDTO> criarCategoria(@Valid @RequestBody CategoriaDTO categoriaDTO) {
        CategoriaDTO categoria =categoriaService.criarCategoria(categoriaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoria);
    }

    @GetMapping
    public ResponseEntity< List<CategoriaContagemResponseDTO>> listarCategorias() {
        List<CategoriaContagemResponseDTO> categorias = categoriaService.listarCategorias();
        return ResponseEntity.status(HttpStatus.OK).body(categorias);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCategoria(@PathVariable long id) {
        categoriaService.deletarCategoria(id);
        return ResponseEntity.noContent().build();
    }
}
