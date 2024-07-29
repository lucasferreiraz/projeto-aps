package com.aps.sige.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.aps.sige.entities.Vaga;

public interface VagaRepository extends JpaRepository<Vaga, Long> {

    @Query("SELECT v FROM Vaga v WHERE v.estacionamento.id = :estacionamentoId AND v.posicao = :posicao")
    Optional<Vaga> findByEstacionamentoIdAndPosicao(@Param("estacionamentoId") Long estacionamentoId, 
                                           @Param("posicao") String posicao);

    @Query("SELECT v FROM Vaga v WHERE v.veiculo.id = :veiculoId")
    Optional<Vaga> findByVeiculoId(@Param("veiculoId") Long veiculoId);

    @Query("SELECT v FROM Vaga v WHERE v.veiculo IS NULL")
    Page<Vaga> findAll(Pageable pageable);
}
