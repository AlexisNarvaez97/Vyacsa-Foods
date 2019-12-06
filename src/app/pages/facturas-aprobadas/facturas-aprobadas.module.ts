import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturasAprobadasPageRoutingModule } from './facturas-aprobadas-routing.module';

import { FacturasAprobadasPage } from './facturas-aprobadas.page';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    FacturasAprobadasPageRoutingModule,
    PipesModule
  ],
  declarations: [FacturasAprobadasPage]
})
export class FacturasAprobadasPageModule {}
