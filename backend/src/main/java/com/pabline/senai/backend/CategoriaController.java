package com.pabline.senai.backend;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("MyLibrary/Categorias")
public class CategoriaController {

    public final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @PostMapping
    public CategoriaDTO criarCategoria(@Valid @RequestBody CategoriaDTO categoriaDTO) {
        return categoriaService.criarCategoria(categoriaDTO);
    }

    @GetMapping
    public List<CategoriaDTO> listarCategoria() {
        return categoriaService.listarCategorias();
    }

    @DeleteMapping("/{id}")
    public void deletarCategoria(@PathVariable long id) {
        categoriaService.deletarCategoria(id);
    }
}
