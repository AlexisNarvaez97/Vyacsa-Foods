import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturaConceptosPage } from './factura-conceptos.page';

const routes: Routes = [
  {
    path: '',
    component: FacturaConceptosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturaConceptosPageRoutingModule {}
