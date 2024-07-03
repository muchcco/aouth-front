import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { SessionService } from 'src/app/_service/session.service';
import { SessionComponent } from 'src/app/validations/session/session.component';
import { ReportsComponent } from './reports.component';

@NgModule({
  declarations: [    
    SessionComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ModalModule.forRoot()
  ],
  providers: [SessionService, BsModalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsModule { }
