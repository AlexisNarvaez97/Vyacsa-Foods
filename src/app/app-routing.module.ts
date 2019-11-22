import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  }
  // {
  //   path: 'facturas-pendientes',
  //   loadChildren: () => import('./pages/facturas-pendientes/facturas-pendientes.module').then( m => m.FacturasPendientesPageModule)
  // },
  // {
  //   path: 'facturas-aprobadas',
  //   loadChildren: () => import('./pages/facturas-aprobadas/facturas-aprobadas.module').then( m => m.FacturasAprobadasPageModule)
  // },
  // {
  //   path: 'graficas',
  //   loadChildren: () => import('./pages/graficas/graficas.module').then( m => m.GraficasPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
