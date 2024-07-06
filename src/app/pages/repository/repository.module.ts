import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryComponent } from './repository.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RepositoryComponent],
  imports: [
    CommonModule,
    RepositoryRoutingModule,
    SharedModule,    
  ],
  bootstrap: [RepositoryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RepositoryModule { }
