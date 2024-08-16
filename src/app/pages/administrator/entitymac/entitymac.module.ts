import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EntitymacComponent } from './entitymac.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  { path: '', component: EntitymacComponent }
];

@NgModule({
  declarations: [EntitymacComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgSelectModule
  ]
})
export class EntitymacModule { }
