import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturasPendientesPageRoutingModule } from './facturas-pendientes-routing.module';

import { FacturasPendientesPage } from './facturas-pendientes.page';
import { ExpandableComponent } from '../../components/expandable/expandable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    FacturasPendientesPageRoutingModule
  ],
  declarations: [FacturasPendientesPage, ExpandableComponent]
})
export class FacturasPendientesPageModule {}
