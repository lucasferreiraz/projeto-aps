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
import com.aps.sige.entities.Veiculo;
import com.aps.sige.repositories.VeiculoRepository;

@Service
public class VeiculoService implements ICRUDService.SaveService<Veiculo>, ICRUDService.UpdateService<Veiculo>,
        ICRUDService.DeleteService, ICRUDService.FindService<Veiculo> {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Override
    public Page<Veiculo> findAllPaged(Pageable pageable) {
        Page<Veiculo> list = veiculoRepository.findAll(pageable);
        return list;
    }

    @Override
    public Veiculo findById(Long id) {
        Optional<Veiculo> obj = veiculoRepository.findById(id);
        Veiculo entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found or not exist."));
        return entity;
    }

    @Override
    public Veiculo save(Veiculo veiculo) {
        return veiculoRepository.save(veiculo);
    }

    @Override
    public Veiculo update(Long id, Veiculo veiculo) {
        Veiculo savedVeiculo = findExistentVeiculo(id);

        BeanUtils.copyProperties(veiculo, savedVeiculo, "id");
        return veiculoRepository.save(savedVeiculo);
    }
    
    private Veiculo findExistentVeiculo(Long id) {
        return veiculoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException());
    }

    @Override
    public void delete(Long id) {
        try {
            veiculoRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("ID not found" + id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }

    }
}
