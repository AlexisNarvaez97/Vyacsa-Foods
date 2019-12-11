import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturasRechazadasPage } from './facturas-rechazadas.page';

const routes: Routes = [
  {
    path: '',
    component: FacturasRechazadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturasRechazadasPageRoutingModule {}
