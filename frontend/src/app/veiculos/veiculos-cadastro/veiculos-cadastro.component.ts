import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { VeiculoService } from '../veiculo.service';
import { Veiculo } from 'src/app/core/model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-veiculos-cadastro',
  templateUrl: './veiculos-cadastro.component.html',
  styleUrls: ['./veiculos-cadastro.component.css']
})
export class VeiculosCadastroComponent implements OnInit {

  veiculo = new Veiculo()

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
    }
  }

  salvar() {
    if(this.editando) {
      this.atualizarLancamento()
    } else {
      this.adicionarLancamento()
    }
  }

  adicionarLancamento() {
    this.veiculoService.adicionar(this.veiculo)
      .subscribe(lancamentoAdicionado => {
        this.messageService.add({
          severity: 'success',
          detail: 'Veículo adicionado com sucesso!'
        });
        this.router.navigate(['veiculos/', lancamentoAdicionado.id])
      },
        error => this.errorHandler.handle(error)
      )
  }

  atualizarLancamento() {
    this.veiculoService.atualizar(this.veiculo)
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

  get editando () {
    return Boolean(this.veiculo.id)
  }

  novo(lancamentoForm: NgForm) {
    lancamentoForm.reset(new Veiculo);

    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.veiculo.placa}`)
  }

}
