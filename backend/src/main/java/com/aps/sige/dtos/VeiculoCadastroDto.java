package com.aps.sige.dtos;

public class VeiculoCadastroDto {

    private String placa;
    private String modelo;
    private String cor;
    private Long estacionamentoId;
    private String posicaoVaga;

    public VeiculoCadastroDto() {
    }

    public VeiculoCadastroDto(String placa, String modelo, String cor, Long estacionamentoId, String posicaoVaga) {
        this.placa = placa;
        this.modelo = modelo;
        this.cor = cor;
        this.estacionamentoId = estacionamentoId;
        this.posicaoVaga = posicaoVaga;
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

    public Long getEstacionamentoId() {
        return estacionamentoId;
    }

    public void setEstacionamentoId(Long estacionamentoId) {
        this.estacionamentoId = estacionamentoId;
    }

    public String getPosicaoVaga() {
        return posicaoVaga;
    }

    public void setPosicaoVaga(String posicaoVaga) {
        this.posicaoVaga = posicaoVaga;
    }

    @Override
    public String toString() {
        return "VeiculoCadastroDto{" +
                "placa='" + placa + '\'' +
                ", modelo='" + modelo + '\'' +
                ", cor='" + cor + '\'' +
                ", estacionamentoId=" + estacionamentoId +
                ", posicaoVaga='" + posicaoVaga + '\'' +
                '}';
    }
}
