import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthPageModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then((m) => m.MainPageModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'verAsistencia',
    loadChildren: () => import('./pages/main/ver-asistencia/ver-asistencia.module').then((m) => m.VerAsistenciaPageModule),
    canActivate: [AuthGuard], // Opcional: Puedes agregar guardias específicas para esta ruta si es necesario
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
