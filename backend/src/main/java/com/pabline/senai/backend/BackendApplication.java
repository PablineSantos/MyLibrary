package com.pabline.senai.backend;

import com.pabline.senai.backend.dto.CategoriaDTO;
import com.pabline.senai.backend.dto.LivroRequestDTO;
import com.pabline.senai.backend.dto.LivroResponseDTO;
import com.pabline.senai.backend.entity.Categoria;
import com.pabline.senai.backend.entity.Livro;
import com.pabline.senai.backend.enums.Status;
import com.pabline.senai.backend.repository.CategoriaRepository;
import com.pabline.senai.backend.repository.LivroRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

    @Service
    public static class LivroService {
        private final LivroRepository livroRepository;
        private final CategoriaRepository categoriaRepository;

        public LivroService(LivroRepository livroRepository, CategoriaRepository categoriaRepository) {
            this.livroRepository = livroRepository;
            this.categoriaRepository = categoriaRepository;
        }

        public LivroResponseDTO cadastrarLivro(LivroRequestDTO livroRequestDTO){
            Categoria categoria= categoriaRepository.findById(livroRequestDTO.getCategoriaId()).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Categoria não cadastrada."));
            Livro livro = new Livro();
            livro.setTitulo(livroRequestDTO.getTitulo());
            livro.setAutor(livroRequestDTO.getAutor());
            livro.setAno(livroRequestDTO.getAno());
            livro.setCategoria(categoria);
            livro.setIsbn(livroRequestDTO.getIsbn());
            livro.setStatus(Status.DISPONIVEL);
            livro= livroRepository.save(livro);
            return new LivroResponseDTO(livro.getId(),livro.getTitulo(),livro.getAutor(),livro.getIsbn(),livro.getAno(),livro.getStatus(),new CategoriaDTO(livro.getCategoria().getId(), livro.getCategoria().getNome(),livro.getCategoria().getDescricao()));
        }

        public List<LivroResponseDTO> listarLivros(Long categoriaId, String termo, Status status){
            List<Livro> livrosFiltrado=livroRepository.buscarComfiltro(termo,categoriaId,status);
            return  livrosFiltrado.stream().map(livro ->  new LivroResponseDTO(livro.getId(),livro.getTitulo(),livro.getAutor(),livro.getIsbn(),livro.getAno(),livro.getStatus(),new CategoriaDTO(livro.getCategoria().getId(), livro.getCategoria().getNome(),livro.getCategoria().getDescricao()))).toList();
        }

        public void deletarLivro (Long id ){
            Livro livro = livroRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Livro não existe "));
            if (livro.getStatus()==Status.EMPRESTADO){
                throw new ResponseStatusException(HttpStatus.CONFLICT,"O livro tem status emprestado, logo não pode ser deletado");
            }
            livroRepository.delete(livro);
        }
    }
}
