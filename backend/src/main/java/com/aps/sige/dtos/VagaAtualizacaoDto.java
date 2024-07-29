package com.aps.sige.dtos;

public class VagaAtualizacaoDto {

    private Long vagaId;
    private Long estacionamentoId;
    private String posicao;
    private Long veiculoId;
    
    public VagaAtualizacaoDto() {
    }

    public VagaAtualizacaoDto(Long vagaId, Long estacionamentoId, String posicao, Long veiculoId) {
        this.vagaId = vagaId;
        this.estacionamentoId = estacionamentoId;
        this.posicao = posicao;
        this.veiculoId = veiculoId;
    }

    public Long getVagaId() {
        return vagaId;
    }

    public void setVagaId(Long vagaId) {
        this.vagaId = vagaId;
    }

    public Long getEstacionamentoId() {
        return estacionamentoId;
    }

    public void setEstacionamentoId(Long estacionamentoId) {
        this.estacionamentoId = estacionamentoId;
    }

    public String getPosicao() {
        return posicao;
    }

    public void setPosicao(String posicao) {
        this.posicao = posicao;
    }

    public Long getVeiculoId() {
        return veiculoId;
    }

    public void setVeiculoId(Long veiculoId) {
        this.veiculoId = veiculoId;
    }

    
}
