import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { MapaRoutingModule } from './mapa-routing.module';
import { InfoLocalComponent } from './info-local/info-local.component';
import { MapaLocalComponent } from './mapa-local/mapa-local.component';


@NgModule({
  declarations: [
    InfoLocalComponent,
    MapaLocalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    ButtonModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    ImageModule,
    InputNumberModule,
    InputTextModule,
    InputMaskModule,
    SelectButtonModule,
    TableModule,
    TooltipModule,
    MessageModule,
    FileUploadModule,

    SharedModule,
    MapaRoutingModule
  ]
})
export class MapaModule { }
