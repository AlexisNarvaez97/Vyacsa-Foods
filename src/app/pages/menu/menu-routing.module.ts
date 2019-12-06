import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: "facturas-pendientes",
        loadChildren: () => import('../facturas-pendientes/facturas-pendientes.module').then( m => m.FacturasPendientesPageModule)
      },
      {
        path: "facturas-aprobadas",
        loadChildren: () => import('../facturas-aprobadas/facturas-aprobadas.module').then( m => m.FacturasAprobadasPageModule)
      },
      {
        path: "graficas",
        loadChildren: () => import('../graficas/graficas.module').then( m => m.GraficasPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'reportes',
        loadChildren: () => import('../reportes/reportes.module').then( m => m.ReportesPageModule)
      },
      {
        path: 'configuracion',
        loadChildren: () => import('../configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'menu/facturas-pendientes'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
