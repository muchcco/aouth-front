import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/modules/layout/layout.component';
import { AdministratorComponent } from './administrator.component';

const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        { path: 'administrator', component: AdministratorComponent },
        { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
        { path: '', redirectTo: 'users', pathMatch: 'full' }
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdministratorRoutingModule { }