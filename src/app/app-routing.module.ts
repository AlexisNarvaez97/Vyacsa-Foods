import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'factura-conceptos/:id',
    loadChildren: () => import('./pages/factura-conceptos/factura-conceptos.module').then( m => m.FacturaConceptosPageModule)
  },
  {
    path: 'factura-editar/:id',
    loadChildren: () => import('./pages/factura-editar/factura-editar.module').then( m => m.FacturaEditarPageModule)
  },
  {
    path: 'language-popover',
    loadChildren: () => import('./pages/language-popover/language-popover.module').then( m => m.LanguagePopoverPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
