import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturasRechazadasPageRoutingModule } from './facturas-rechazadas-routing.module';

import { FacturasRechazadasPage } from './facturas-rechazadas.page';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    TranslateModule,
    IonicModule,
    FacturasRechazadasPageRoutingModule
  ],
  declarations: [FacturasRechazadasPage]
})
export class FacturasRechazadasPageModule {}
