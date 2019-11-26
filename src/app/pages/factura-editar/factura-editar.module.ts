import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaEditarPageRoutingModule } from './factura-editar-routing.module';

import { FacturaEditarPage } from './factura-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturaEditarPageRoutingModule
  ],
  declarations: [FacturaEditarPage]
})
export class FacturaEditarPageModule {}
