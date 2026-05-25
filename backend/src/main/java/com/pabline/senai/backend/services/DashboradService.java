package com.pabline.senai.backend.services;

import com.pabline.senai.backend.dto.DashboardResponseDTO;
import com.pabline.senai.backend.dto.EmprestimoResponseDTO;
import com.pabline.senai.backend.entity.Emprestimo;
import com.pabline.senai.backend.enums.Status;
import com.pabline.senai.backend.repository.EmprestimoRepository;
import com.pabline.senai.backend.repository.LivroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboradService {

    private final EmprestimoRepository emprestimoRepository;
    private final LivroRepository livroRepository;

    public DashboradService(EmprestimoRepository emprestimoRepository, LivroRepository livroRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroRepository = livroRepository;
    }

    public DashboardResponseDTO obterEstatisticas() {
        long totalLivros = livroRepository.count();
        long disponiveis = livroRepository.countByStatus(Status.DISPONIVEL);
        long emprestados = livroRepository.countByStatus(Status.EMPRESTADO);
        long ativos = emprestimoRepository.countByDataDevolucaoIsNull();

        List<Emprestimo> ultimos = emprestimoRepository.findAllByOrderByDataEmprestimoDesc();
        List<EmprestimoResponseDTO> ultimosDTO = ultimos.stream()
                .map(EmprestimoResponseDTO::new)
                .toList();

        return new DashboardResponseDTO(totalLivros, disponiveis, emprestados, ativos, ultimosDTO);
    }
}
