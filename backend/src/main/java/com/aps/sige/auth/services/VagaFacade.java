package com.aps.sige.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.aps.sige.dtos.VagaAtualizacaoDto;
import com.aps.sige.entities.Vaga;
import com.aps.sige.repositories.EstacionamentoRepository;
import com.aps.sige.repositories.VagaRepository;
import com.aps.sige.repositories.VeiculoRepository;

import jakarta.transaction.Transactional;

@Service
public class VagaFacade {

    @Autowired
    private VagaRepository vagaRepository;

    @Autowired
    private EstacionamentoRepository estacionamentoRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    public Page<Vaga> listarVagas(Pageable pageable) {
        return vagaRepository.findAll(pageable);
    }

    @Transactional
    public Vaga atualizarVaga(VagaAtualizacaoDto dto) {
        Vaga vaga = vagaRepository.findById(dto.getVagaId())
            .orElseThrow(() -> new IllegalArgumentException("Vaga não encontrada"));

        vaga.setPosicao(dto.getPosicao());

        if (dto.getEstacionamentoId() != null) {
            estacionamentoRepository.findById(dto.getEstacionamentoId())
                .ifPresent(vaga::setEstacionamento);
        }

        if (dto.getVeiculoId() != null) {
            veiculoRepository.findById(dto.getVeiculoId())
                .ifPresent(vaga::setVeiculo);
        }

        return vagaRepository.save(vaga);
    }
}
