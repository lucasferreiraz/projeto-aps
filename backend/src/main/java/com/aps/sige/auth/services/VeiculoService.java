package com.aps.sige.auth.services;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.aps.sige.auth.services.exceptions.DatabaseException;
import com.aps.sige.auth.services.exceptions.ResourceNotFoundException;
import com.aps.sige.dtos.VeiculoAtualizacaoDto;
import com.aps.sige.dtos.VeiculoCadastroDto;
import com.aps.sige.dtos.VeiculoResponseDto;
import com.aps.sige.entities.Estacionamento;
import com.aps.sige.entities.Vaga;
import com.aps.sige.entities.Veiculo;
import com.aps.sige.repositories.EstacionamentoRepository;
import com.aps.sige.repositories.VagaRepository;
import com.aps.sige.repositories.VeiculoRepository;

import jakarta.transaction.Transactional;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private VagaRepository vagaRepository;

    @Autowired
    private EstacionamentoRepository estacionamentoRepository;

    public Page<Veiculo> findAllPaged(Pageable pageable) {
        Page<Veiculo> list = veiculoRepository.findAll(pageable);
        return list;
    }

    public Page<VeiculoResponseDto> findAllDetailsPaged(Pageable pageable) {
        Page<VeiculoResponseDto> list = veiculoRepository.findAllVeiculosWithDetails(pageable);
        return list;
    }

    public Veiculo findById(Long id) {
        Optional<Veiculo> obj = veiculoRepository.findById(id);
        Veiculo entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found or not exist."));
        return entity;
    }

    public VeiculoResponseDto findVeiculoById(Long veiculoId) {
        Optional<VeiculoResponseDto> veiculoOpt = veiculoRepository.findByIdWithDetails(veiculoId);
        return veiculoOpt.orElseThrow(() -> new ResourceNotFoundException("Veículo não encontrado"));
    }

    public Veiculo save(Veiculo veiculo) {
        return veiculoRepository.save(veiculo);
    }

    public Veiculo update(Long id, Veiculo veiculo) {
        Veiculo savedVeiculo = findExistentVeiculo(id);

        BeanUtils.copyProperties(veiculo, savedVeiculo, "id");
        return veiculoRepository.save(savedVeiculo);
    }
    
    private Veiculo findExistentVeiculo(Long id) {
        return veiculoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException());
    }

    public void delete(Long id) {
        try {
            veiculoRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("ID not found" + id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }

    @Transactional
    public void cadastrarVeiculo(VeiculoCadastroDto veiculoCadastroDto) {
        Veiculo veiculo = new Veiculo();
        veiculo.setPlaca(veiculoCadastroDto.getPlaca());
        veiculo.setModelo(veiculoCadastroDto.getModelo());
        veiculo.setCor(veiculoCadastroDto.getCor());

        veiculo = veiculoRepository.save(veiculo);

        Optional<Vaga> vagaOptional = vagaRepository.findByEstacionamentoIdAndPosicao(
                veiculoCadastroDto.getEstacionamentoId(),
                veiculoCadastroDto.getPosicaoVaga());

        if (vagaOptional.isPresent()) {
            Vaga vaga = vagaOptional.get();
            vaga.setVeiculo(veiculo);
            vagaRepository.save(vaga);
        } else {
            throw new ResourceNotFoundException("Vaga não encontrada.");
        }
    }

    @Transactional
    public void removerVeiculo(Long veiculoId) {
        Veiculo veiculo = veiculoRepository.findById(veiculoId)
                .orElseThrow(() -> new ResourceNotFoundException("Veículo não encontrado"));

        Optional<Vaga> vagaOptional = vagaRepository.findByVeiculoId(veiculoId);
        if (vagaOptional.isPresent()) {
            Vaga vaga = vagaOptional.get();
            vaga.setVeiculo(null);
            vagaRepository.save(vaga);
        }

        veiculoRepository.delete(veiculo);
    }

    @Transactional
    public VeiculoResponseDto atualizarVeiculo(VeiculoAtualizacaoDto dto) {
        
        Veiculo veiculo = veiculoRepository.findById(dto.getVeiculoId())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));

        veiculo.setPlaca(dto.getPlaca());
        veiculo.setModelo(dto.getModelo());
        veiculo.setCor(dto.getCor());

        Optional<Vaga> vagaOpt = vagaRepository.findByVeiculoId(dto.getVeiculoId());
        if (vagaOpt.isPresent()) {
            Vaga vaga = vagaOpt.get();
            vaga.setVeiculo(null);
            vagaRepository.save(vaga);
        }

        Optional<Vaga> vagaOptional = vagaRepository.findById(dto.getVagaId());
        if (vagaOptional.isPresent()) {
            Vaga vaga = vagaOptional.get();
            if (vaga.getVeiculo() != null && !vaga.getVeiculo().getId().equals(dto.getVeiculoId())) {
                throw new RuntimeException("A vaga não pertence ao veículo especificado.");
            }

            Estacionamento estacionamento = estacionamentoRepository.findById(dto.getEstacionamentoId())
                    .orElseThrow(() -> new RuntimeException("Estacionamento não encontrado"));

            if (vaga.getVeiculo() != null) {
                vaga.setVeiculo(null);
            }

            vaga.setVeiculo(veiculo); 
            vaga.setEstacionamento(estacionamento);

            vagaRepository.save(vaga);
        } else {
            throw new RuntimeException("Vaga não encontrada");
        }

        veiculoRepository.save(veiculo);

        Vaga vagaAtualizada = vagaRepository.findById(dto.getVagaId())
                .orElseThrow(() -> new RuntimeException("Vaga não encontrada após atualização"));

        return new VeiculoResponseDto(
                veiculo.getId(),
                veiculo.getPlaca(),
                veiculo.getModelo(),
                veiculo.getCor(),
                vagaAtualizada.getId(),
                vagaAtualizada.getPosicao(),
                vagaAtualizada.getEstacionamento().getId(),
                vagaAtualizada.getEstacionamento().getNome()
        );
    }
}
