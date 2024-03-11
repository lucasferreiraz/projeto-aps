import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VeiculosCadastroComponent } from './veiculos-cadastro/veiculos-cadastro.component';
import { RouterModule, Routes } from '@angular/router';
import { VeiculosPesquisaComponent } from './veiculos-pesquisa/veiculos-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: VeiculosPesquisaComponent,
  },
  {
    path: 'novo',
    component: VeiculosCadastroComponent,
  },
  {
    path: ':id',
    component: VeiculosCadastroComponent,
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VeiculosRoutingModule { }
