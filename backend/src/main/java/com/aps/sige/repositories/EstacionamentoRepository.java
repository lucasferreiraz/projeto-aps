package com.aps.sige.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.aps.sige.entities.Estacionamento;

public interface EstacionamentoRepository extends JpaRepository<Estacionamento, Long> {
    Page<Estacionamento> findAll(Pageable pageable);
}
