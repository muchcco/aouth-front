import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalComponent } from 'src/app/modules/external/external.component';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalComponent,
    children: [
      { path: '', component: PublicComponent },
      { path: 'personal', loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule) },
      { path: '', redirectTo: 'personal', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
