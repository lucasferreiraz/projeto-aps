import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { VeiculoService } from '../veiculo.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-veiculos-grid',
  templateUrl: './veiculos-grid.component.html',
  styleUrls: ['./veiculos-grid.component.css']
})
export class VeiculosGridComponent {

  @Input() veiculos: any;
  @Input() itensPorPagina: any;
  @Input() totalRegistros: any;

  @Output() paginaMudou = new EventEmitter<number>();
  @Output() excluirVeiculo = new EventEmitter<any>();

  @ViewChild('tabela') grid: any

  constructor(
    private veiculoService: VeiculoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService
  ) { }

  aoMudarPagina(event: TableLazyLoadEvent) {
    const pagina = (event.first ?? 0) / (event.rows ?? 1)
    this.paginaMudou.emit(pagina)
  }

  confirmarExclusao(veiculo: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(veiculo);
      }
    });
  }

  excluir(veiculo: any) {
    this.veiculoService.remove(veiculo.veiculoId)
      .subscribe(() => {
        if (this.grid.first === 0) {
          this.paginaMudou.emit(0)
        } else {
          this.excluirVeiculo.emit()
          this.grid.first = 0
        }

        this.messageService.add({
          severity: 'success',
          detail: 'Veículo excluído com sucesso!'
        })
      },
        error => {
          this.errorHandler.handle(error)
        }
      )
  }

  naoTemPermissao (permissao: string) {
    return !this.auth.temPermissao(permissao);
  }

}
