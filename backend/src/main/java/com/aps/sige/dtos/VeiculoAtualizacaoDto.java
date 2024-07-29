package com.aps.sige.dtos;

public class VeiculoAtualizacaoDto {

    private Long veiculoId;
    private String placa;
    private String modelo;
    private String cor;
    private Long vagaId;
    private String posicao;
    private Long estacionamentoId; 

    public VeiculoAtualizacaoDto() {
    }

    public VeiculoAtualizacaoDto(Long veiculoId, String placa, String modelo, String cor, Long vagaId, String posicao,
            Long estacionamentoId) {
        this.veiculoId = veiculoId;
        this.placa = placa;
        this.modelo = modelo;
        this.cor = cor;
        this.vagaId = vagaId;
        this.posicao = posicao;
        this.estacionamentoId = estacionamentoId;
    }

    public Long getVeiculoId() {
        return veiculoId;
    }

    public void setVeiculoId(Long veiculoId) {
        this.veiculoId = veiculoId;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public Long getVagaId() {
        return vagaId;
    }

    public void setVagaId(Long vagaId) {
        this.vagaId = vagaId;
    }

    public String getPosicao() {
        return posicao;
    }

    public void setPosicao(String posicao) {
        this.posicao = posicao;
    }

    public Long getEstacionamentoId() {
        return estacionamentoId;
    }

    public void setEstacionamentoId(Long estacionamentoId) {
        this.estacionamentoId = estacionamentoId;
    }

}