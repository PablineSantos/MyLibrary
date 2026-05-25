package com.pabline.senai.backend.services;

import com.pabline.senai.backend.dto.CategoriaContagemResponseDTO;
import com.pabline.senai.backend.entity.Categoria;
import com.pabline.senai.backend.repository.CategoriaRepository;
import com.pabline.senai.backend.dto.CategoriaDTO;
import com.pabline.senai.backend.repository.LivroRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final LivroRepository livroRepository;

    public CategoriaService(CategoriaRepository categoriaRepository, LivroRepository livroRepository) {
        this.categoriaRepository = categoriaRepository;
        this.livroRepository = livroRepository;
    }

    public CategoriaDTO criarCategoria(CategoriaDTO categoriaDTO) {
        if (categoriaRepository.existsByNomeIgnoreCase(categoriaDTO.getNome())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Categoria já existe");
        }
        Categoria categoria = new Categoria();
        categoria.setNome(categoriaDTO.getNome());
        categoria.setDescricao(categoriaDTO.getDescricao());
        categoriaRepository.save(categoria);
        return new CategoriaDTO(categoria);
    }

    public List<CategoriaContagemResponseDTO> listarCategorias() {
        return categoriaRepository.buscarCategoriasComContagem();
    }

    public void deletarCategoria(Long id) {
        Categoria categoria = categoriaRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não existe"));
        if (livroRepository.existsByCategoria_Id(id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Não é possível excluir a categoria pois existem livros vinculados a ela ");
        }
        categoriaRepository.delete(categoria);
    }
}
