import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { authGuard } from './seguranca/auth.guard';
import { VeiculosModule } from './veiculos/veiculos.module';

const routes: Routes = [
  {
    path: 'veiculos',
    loadChildren: () => import('./veiculos/veiculos.module').then(m => m.VeiculosModule)
  },
  {
    path: 'pagina-nao-encontrada',
    component: PaginaNaoEncontradaComponent,
    canActivate: [authGuard],
  },

  { path: '**', redirectTo: 'pagina-nao-encontrada'}
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
