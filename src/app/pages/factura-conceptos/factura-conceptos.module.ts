import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaConceptosPageRoutingModule } from './factura-conceptos-routing.module';

import { FacturaConceptosPage } from './factura-conceptos.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    FacturaConceptosPageRoutingModule
  ],
  declarations: [FacturaConceptosPage]
})
export class FacturaConceptosPageModule {}
