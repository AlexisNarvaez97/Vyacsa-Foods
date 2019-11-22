import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturasPendientesPage } from './facturas-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: FacturasPendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturasPendientesPageRoutingModule {}
