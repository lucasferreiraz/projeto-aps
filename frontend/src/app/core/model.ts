export class Login {
  email?: string;
  password?: string;
}

export class Veiculo {
  id?: number;
  placa?: string;
  modelo?: string;
  cor?: string;
}

export class VeiculoModel {
  veiculoId?: number;
  placa?: string;
  modelo?: string;
  cor?: string;
  vagaId?: number;
  posicao?: string;
  estacionamentoId?: number;
  estacionamentoNome?: string;
}

export class VeiculoCadastro {
  placa?: string;
  modelo?: string;
  cor?: string;
  posicaoVaga?: string;
  estacionamentoId?: number;
}

export class VeiculoAtualizacao {
  veiculoId?: number;
  placa?: string;
  modelo?: string;
  cor?: string;
  vagaId?: number;
  posicao?: string;
  estacionamentoId?: number;
}

export class Vaga {
  id?: number;
  posicao?: string;
  veiculo?: Veiculo
}

export class Estacionamento {
  id?: number;
  nome?: string;
}
