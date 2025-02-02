import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { InfoLocalComponent } from './info-local/info-local.component';
import { MapaLocalComponent } from './mapa-local/mapa-local.component';
import { MapaRoutingModule } from './mapa-routing.module';
import { AngularToastifyModule, ToastService } from 'angular-toastify';

@NgModule({
  declarations: [
    InfoLocalComponent,
    MapaLocalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    AngularToastifyModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    DialogModule,
    DropdownModule,
    ImageModule,
    InputNumberModule,
    InputTextModule,
    InputMaskModule,
    RatingModule,
    DividerModule,
    SelectButtonModule,
    SliderModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TooltipModule,
    MessageModule,
    FileUploadModule,

    SharedModule,
    MapaRoutingModule
  ],
  providers: [ToastService],
})
export class MapaModule { }
