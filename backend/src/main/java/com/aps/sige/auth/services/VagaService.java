package com.aps.sige.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.aps.sige.dtos.VagaAtualizacaoDto;
import com.aps.sige.entities.Vaga;

import jakarta.transaction.Transactional;

@Service
public class VagaService {

    @Autowired
    private VagaFacade vagaFacade;

    public Page<Vaga> listarVagas(Pageable pageable) {
        return vagaFacade.listarVagas(pageable);
    }

    @Transactional
    public Vaga atualizarVaga(VagaAtualizacaoDto dto) {
        return vagaFacade.atualizarVaga(dto);
    }
}
