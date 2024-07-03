import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorComponent } from './administrator.component';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AdministratorComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedModule,
    ModalModule.forRoot()
  ],
  bootstrap: [AdministratorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdministratorModule { }
