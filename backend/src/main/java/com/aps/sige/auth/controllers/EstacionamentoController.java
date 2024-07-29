package com.aps.sige.auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aps.sige.auth.services.EstacionamentoService;
import com.aps.sige.entities.Estacionamento;

@CrossOrigin
@RestController
@RequestMapping("/estacionamentos")
public class EstacionamentoController {

    @Autowired
    private EstacionamentoService estacionamentoService;

    @GetMapping
    public Page<Estacionamento> listarEstacionamentos(Pageable pageable) {
        return estacionamentoService.listarEstacionamentos(pageable);
    }
}
