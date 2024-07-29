package com.aps.sige.auth.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.aps.sige.auth.services.VeiculoService;
import com.aps.sige.dtos.VeiculoAtualizacaoDto;
import com.aps.sige.dtos.VeiculoCadastroDto;
import com.aps.sige.dtos.VeiculoResponseDto;
import com.aps.sige.entities.Veiculo;

@CrossOrigin
@RestController
@RequestMapping("/veiculos")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @GetMapping
    public ResponseEntity<Page<Veiculo>> findAll(Pageable pageable) {

        Page<Veiculo> list = veiculoService.findAllPaged(pageable);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/getVeiculosDetails")
    public ResponseEntity<Page<VeiculoResponseDto>> findAllDetails(Pageable pageable) {

        Page<VeiculoResponseDto> list = veiculoService.findAllDetailsPaged(pageable);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Veiculo> findById(@PathVariable Long id) {

        Veiculo obj = veiculoService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("/withDetails/{id}")
    public ResponseEntity<VeiculoResponseDto> getVeiculoById(@PathVariable Long id) {
        VeiculoResponseDto veiculo = veiculoService.findVeiculoById(id);
        return ResponseEntity.ok(veiculo);
    }

    @PostMapping
    public ResponseEntity<Veiculo> insert(@RequestBody Veiculo veiculo) {

        veiculo = veiculoService.save(veiculo);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(veiculo.getId())
                .toUri();

        return ResponseEntity.created(uri).body(veiculo);
    }

    @PostMapping(value = "/insertVeiculo")
    public ResponseEntity<Void> insertVeiculo(@RequestBody VeiculoCadastroDto veiculoCadastroDto) {
        veiculoService.cadastrarVeiculo(veiculoCadastroDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeVeiculo(@PathVariable Long id) {
        try {
            veiculoService.removerVeiculo(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao remover veículo: " + e.getMessage());
        }
    }

    @PutMapping("/atualizar")
    public ResponseEntity<VeiculoResponseDto> atualizarVeiculo(@RequestBody VeiculoAtualizacaoDto dto) {
        try {
            VeiculoResponseDto response = veiculoService.atualizarVeiculo(dto);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Veiculo> update(@PathVariable Long id, @RequestBody Veiculo veiculo) {

        veiculo = veiculoService.update(id, veiculo);

        return ResponseEntity.ok().body(veiculo);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        veiculoService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
