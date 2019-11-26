import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturaEditarPage } from './factura-editar.page';

const routes: Routes = [
  {
    path: '',
    component: FacturaEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturaEditarPageRoutingModule {}
