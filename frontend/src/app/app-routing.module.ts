import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { authGuard } from './seguranca/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
