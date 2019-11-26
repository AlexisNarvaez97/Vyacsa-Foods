import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaConceptosPageRoutingModule } from './factura-conceptos-routing.module';

import { FacturaConceptosPage } from './factura-conceptos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturaConceptosPageRoutingModule
  ],
  declarations: [FacturaConceptosPage]
})
export class FacturaConceptosPageModule {}
