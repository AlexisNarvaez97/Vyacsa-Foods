import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturasAprobadasPageRoutingModule } from './facturas-aprobadas-routing.module';

import { FacturasAprobadasPage } from './facturas-aprobadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturasAprobadasPageRoutingModule
  ],
  declarations: [FacturasAprobadasPage]
})
export class FacturasAprobadasPageModule {}
