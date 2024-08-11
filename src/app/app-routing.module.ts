import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/errors/error404/error404.component';
import { Error500Component } from './pages/errors/error500/error500.component';
import { LoginComponent } from './login/login/login.component'; 
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'reports', 
    loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'administrator', 
    loadChildren: () => import('./pages/administrator/administrator.module').then(m => m.AdministratorModule), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'repository', 
    loadChildren: () => import('./pages/repository/repository.module').then(m => m.RepositoryModule), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'public', 
    loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule) 
  },
  { path: 'logout', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'error404', component: Error404Component },
  { path: 'error500', component: Error500Component },
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  // { path: '**', redirectTo: '/error404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
