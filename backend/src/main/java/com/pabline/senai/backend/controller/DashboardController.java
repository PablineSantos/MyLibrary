package com.pabline.senai.backend.controller;

import com.pabline.senai.backend.dto.DashboardResponseDTO;
import com.pabline.senai.backend.services.DashboradService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("MyLibrary/Dashbord")
public class DashboardController {
    private final DashboradService dashboradService;


    public DashboardController(DashboradService dashboradService) {
        this.dashboradService = dashboradService;
    }

    @GetMapping
    public ResponseEntity<DashboardResponseDTO> obterEstatisticas(){
        DashboardResponseDTO dashboard = dashboradService.obterEstatisticas();
        return  ResponseEntity.status(HttpStatus.OK).body(dashboard);
    }

}
