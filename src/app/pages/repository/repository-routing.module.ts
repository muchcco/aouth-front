import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/modules/layout/layout.component';
import { DocumentComponent } from './document/document.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'repository', component: DocumentComponent},
      {path: 'document', loadChildren: () => import('./document/document.module').then(m => m.DocumentModule)},
      {path: '', redirectTo: 'document', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule { }
