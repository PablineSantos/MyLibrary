package com.pabline.senai.backend;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;


    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public CategoriaDTO criarCategoria (CategoriaDTO categoriaDTO){
       if (categoriaRepository.existsByNomeIgnoreCase(categoriaDTO.getNome())){
           throw new ResponseStatusException(HttpStatus.CONFLICT,"Categoria já existe");
       }
       Categoria novaCategoria=new Categoria();
       novaCategoria.setNome(categoriaDTO.getNome());
       novaCategoria.setDescricao(categoriaDTO.getDescricao());
       categoriaRepository.save(novaCategoria);
       return new CategoriaDTO (novaCategoria.getId(),novaCategoria.getNome(),novaCategoria.getDescricao());
    }

    public List<CategoriaDTO> listarCategorias (){
     return categoriaRepository.findAll().stream().map(c-> new CategoriaDTO(c.getId(),c.getNome(),c.getDescricao())).collect(Collectors.toList());
    }

    public void deletarCategoria(Long id){
        Categoria categoria= categoriaRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Categoria não existe"));
        categoriaRepository.delete(categoria);
    }
}
