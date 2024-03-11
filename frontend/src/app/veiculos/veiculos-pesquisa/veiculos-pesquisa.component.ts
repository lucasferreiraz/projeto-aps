import { Component, OnInit } from '@angular/core';
import { VeiculoFiltro, VeiculoService } from '../veiculo.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-veiculos-pesquisa',
  templateUrl: './veiculos-pesquisa.component.html',
  styleUrls: ['./veiculos-pesquisa.component.css']
})
export class VeiculosPesquisaComponent implements OnInit {

  itensPorPagina = 0
  totalRegistros = 0
  filtro = new VeiculoFiltro()

  veiculos = [];

  constructor(
    private veiculoService: VeiculoService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Pesquisa de lançamentos")
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina
    this.veiculoService.buscaPorId(4)
    this.veiculoService.pesquisar(this.filtro)
      .subscribe(
        data => {
          this.itensPorPagina = data['size']
          this.totalRegistros = data['totalElements']
          this.veiculos = data['content']
        },
        error => {
          this.errorHandler.handle(error)
        }
      )
  }

  onExcluirLancamento() {
    this.pesquisar()
  }
}
