import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { CommonModule } from '@angular/common';
import { InfoLocalComponent } from './info-local/info-local.component';

const routes: Routes = [
  {
    path: '',
    component: MapaComponent,
  },
  {
    path: 'info-local/:latlng',
    component: InfoLocalComponent,
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
export class MapaRoutingModule { }
