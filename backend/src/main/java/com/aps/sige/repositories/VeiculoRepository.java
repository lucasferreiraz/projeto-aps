package com.aps.sige.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.aps.sige.dtos.VeiculoResponseDto;
import com.aps.sige.entities.Veiculo;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {

    @Query("SELECT new com.aps.sige.dtos.VeiculoResponseDto(" +
           "v.id, " +
           "v.placa, " +
           "v.modelo, " +
           "v.cor, " +
           "va.id, " +
           "va.posicao, " +
           "e.id, " +
           "e.nome) " +
           "FROM Veiculo v " +
           "JOIN Vaga va ON va.veiculo.id = v.id " +
           "JOIN Estacionamento e ON e.id = va.estacionamento.id")
    Page<VeiculoResponseDto> findAllVeiculosWithDetails(Pageable pageable);

    @Query("SELECT new com.aps.sige.dtos.VeiculoResponseDto(" +
           "v.id, " +
           "v.placa, " +
           "v.modelo, " +
           "v.cor, " +
           "va.id, " +
           "va.posicao, " +
           "e.id, " +
           "e.nome) " +
           "FROM Veiculo v " +
           "JOIN Vaga va ON va.veiculo.id = v.id " +
           "JOIN Estacionamento e ON e.id = va.estacionamento.id " +
           "WHERE v.id = :veiculoId")
    Optional<VeiculoResponseDto> findByIdWithDetails(@Param("veiculoId") Long veiculoId);
}
