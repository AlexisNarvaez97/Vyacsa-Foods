import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaEditarPageRoutingModule } from './factura-editar-routing.module';

import { FacturaEditarPage } from './factura-editar.page';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

import { IonicSelectableModule } from 'ionic-selectable';
import { SelectComponent } from '../../components/select/select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    IonicSelectableModule,
    FacturaEditarPageRoutingModule
  ],
  declarations: [FacturaEditarPage, SelectComponent]
})
export class FacturaEditarPageModule {}
