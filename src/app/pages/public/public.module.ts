import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', redirectTo: 'personal', pathMatch: 'full' },
      { path: 'personal', loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule) }
    ]
  }
];

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PublicModule { }
