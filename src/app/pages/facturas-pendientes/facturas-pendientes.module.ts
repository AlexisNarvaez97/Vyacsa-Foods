import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturasPendientesPageRoutingModule } from './facturas-pendientes-routing.module';

import { FacturasPendientesPage } from './facturas-pendientes.page';
import { ExpandableComponent } from '../../components/expandable/expandable.component';
import { TranslateModule } from '@ngx-translate/core';
// import { LanguagePopoverPageModule } from '../language-popover/language-popover.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    FacturasPendientesPageRoutingModule,
    TranslateModule
  ],
  declarations: [FacturasPendientesPage, ExpandableComponent]
})
export class FacturasPendientesPageModule {}
