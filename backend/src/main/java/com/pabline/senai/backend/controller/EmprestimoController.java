package com.pabline.senai.backend.controller;

import com.pabline.senai.backend.dto.EmprestimoRequestDTO;
import com.pabline.senai.backend.dto.EmprestimoResponseDTO;
import com.pabline.senai.backend.repository.EmprestimoRepository;
import com.pabline.senai.backend.services.EmprestimoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("MyLibrary/Emprestimos")
public class EmprestimoController {
    private final EmprestimoService emprestimoService;

    public EmprestimoController(EmprestimoService emprestimoService) {
        this.emprestimoService = emprestimoService;
    }

    @PostMapping
    public ResponseEntity<EmprestimoResponseDTO> emprestar(@Valid @RequestBody EmprestimoRequestDTO emprestimoRequestDTO){
        EmprestimoResponseDTO emprestimoResponseDTO = emprestimoService.emprestar(emprestimoRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(emprestimoResponseDTO);
    }

    @PutMapping("/{id}/devolver")
    public ResponseEntity<EmprestimoResponseDTO> devolucao(@PathVariable Long id){
        EmprestimoResponseDTO emprestimoResponseDTO = emprestimoService.devolucao(id);
        return ResponseEntity.status(HttpStatus.OK).body(emprestimoResponseDTO);

    }

}
