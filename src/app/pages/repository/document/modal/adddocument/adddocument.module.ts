import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdddocumentComponent } from './adddocument.component';
import {RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes:Routes = [
  {path: '', component: AdddocumentComponent}
]

@NgModule({
  declarations: [AdddocumentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})


export class AdddocumentModule {}
