import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaEditarPageRoutingModule } from './factura-editar-routing.module';

import { FacturaEditarPage } from './factura-editar.page';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    FacturaEditarPageRoutingModule
  ],
  declarations: [FacturaEditarPage]
})
export class FacturaEditarPageModule {}
