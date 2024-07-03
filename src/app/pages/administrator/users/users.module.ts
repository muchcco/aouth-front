import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { UsersComponent } from './users.component';

const routes: Routes = [
    { path: '', component: UsersComponent }
  ];
  
  @NgModule({
    declarations: [UsersComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      HttpClientModule,
      NgxPaginationModule,
      NgxSpinnerModule    
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  export class UsersModule { }