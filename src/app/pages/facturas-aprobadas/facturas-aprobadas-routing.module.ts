import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturasAprobadasPage } from './facturas-aprobadas.page';

const routes: Routes = [
  {
    path: '',
    component: FacturasAprobadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturasAprobadasPageRoutingModule {}
