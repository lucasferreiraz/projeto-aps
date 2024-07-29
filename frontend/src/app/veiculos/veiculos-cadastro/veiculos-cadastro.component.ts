import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { VeiculoService } from '../veiculo.service';
import { Estacionamento, Vaga, Veiculo, VeiculoAtualizacao, VeiculoCadastro, VeiculoModel } from 'src/app/core/model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-veiculos-cadastro',
  templateUrl: './veiculos-cadastro.component.html',
  styleUrls: ['./veiculos-cadastro.component.css']
})
export class VeiculosCadastroComponent implements OnInit {

  veiculo = new Veiculo()
  veiculoModel = new VeiculoModel();

  vaga = new Vaga()
  listaVagas = []
  displayModalVagas: boolean = false;
  loadingVagas: boolean = true

  estacionamento = new Estacionamento()
  listaEstacionamento = []
  displayModalEstacionamento: boolean = false;
  loadingEstacionamento: boolean = true

  veiculoCadastro = new VeiculoCadastro();
  veiculoAtualizar = new VeiculoAtualizacao();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veiculoService: VeiculoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Novo veículo")

    const idLancamento = this.route.snapshot.params['id'];

    if (idLancamento) {
      this.carregarLancamento(idLancamento);
      this.carregarComDetalhes(idLancamento)
    }
  }

  salvar() {
    if(this.editando) {
      this.popularVeiculoAtualizado();
      this.atualizarLancamento()
    } else {
      this.popularVeiculoCadastro();
      this.adicionarLancamento()
    }
  }

  adicionarLancamento() {
    this.veiculoService.insert(this.veiculoCadastro)
      .subscribe(lancamentoAdicionado => {
        this.messageService.add({
          severity: 'success',
          detail: 'Veículo adicionado com sucesso!'
        });
        this.router.navigate(['veiculos/', lancamentoAdicionado.veiculoId])
      },
        error => this.errorHandler.handle(error)
      )
  }

  atualizarLancamento() {
    this.veiculoService.update(this.veiculoAtualizar)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          detail: 'Veículo alterado com sucesso!'
        });

        this.atualizarTituloEdicao()
      },
        error => this.errorHandler.handle(error)
      )
  }

  carregarLancamento(id: number) {
    this.veiculoService.buscaPorId(id)
      .subscribe(veiculo => {
        this.veiculo = veiculo
        this.atualizarTituloEdicao()
      })
  }

  carregarComDetalhes(id: number) {
    this.veiculoService.findByIdWithDetails(id)
      .subscribe(veiculo => {
        this.veiculoModel = veiculo
        this.atualizarTituloEdicao()
      })
  }

  get editando () {
    return Boolean(this.veiculo.id)
  }

  novo(lancamentoForm: NgForm) {
    lancamentoForm.reset(new Veiculo);

    this.router.navigate(['veiculos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.veiculo.placa}`)
  }

  showModalDialogVagas() {
    this.findAllVagas();
    this.displayModalVagas = true;
  }

  findAllVagas() {
    this.veiculoService.findAllVagas().subscribe((data) => {
      this.listaVagas = data.content;
      this.loadingVagas = false;
    });
  }

  showModalDialogEstacionamento() {
    this.findAllEstacionamento();
    this.displayModalEstacionamento = true;
  }

  findAllEstacionamento() {
    this.veiculoService.findAllEstacionamentos().subscribe((data) => {
      this.listaEstacionamento = data.content;
      this.loadingEstacionamento = false;
    });
  }

  popularVeiculoCadastro() {
    this.veiculoCadastro = {
      placa: this.veiculo.placa,
      modelo: this.veiculo.modelo,
      cor: this.veiculo.cor,
      posicaoVaga: this.vaga.posicao,
      estacionamentoId: this.estacionamento.id
    };
  }

  popularVeiculoAtualizado() {
    this.veiculoAtualizar = {
      veiculoId: this.veiculo.id,
      placa: this.veiculo.placa,
      modelo: this.veiculo.modelo,
      cor: this.veiculo.cor,
      vagaId: this.vaga.id,
      posicao: this.vaga.posicao,
      estacionamentoId: this.estacionamento.id
    }
  }
}
