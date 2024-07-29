package com.aps.sige.auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aps.sige.auth.services.VagaService;
import com.aps.sige.dtos.VagaAtualizacaoDto;
import com.aps.sige.entities.Vaga;

@CrossOrigin
@RestController
@RequestMapping("/vagas")
public class VagaController {

    @Autowired
    private VagaService vagaService;

    @GetMapping
    public Page<Vaga> listarVagas(Pageable pageable) {
        return vagaService.listarVagas(pageable);
    }

    @PutMapping("/atualizar")
    public ResponseEntity<Vaga> atualizarVaga(@RequestBody VagaAtualizacaoDto dto) {
        Vaga vagaAtualizada = vagaService.atualizarVaga(dto);
        return ResponseEntity.ok(vagaAtualizada);
    }
}
