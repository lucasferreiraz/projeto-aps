package com.aps.sige.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.aps.sige.entities.Estacionamento;
import com.aps.sige.repositories.EstacionamentoRepository;

@Service
public class EstacionamentoService {

    @Autowired
    private EstacionamentoRepository estacionamentoRepository;

    public Page<Estacionamento> listarEstacionamentos(Pageable pageable) {
        return estacionamentoRepository.findAll(pageable);
    }
}
