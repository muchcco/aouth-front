import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';  // Asegúrate de tener esta importación
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedComponent } from './shared/shared.component';
import { ReportsModule } from './pages/reports/reports.module';
import { AuthInterceptor } from './_helpers/http.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './_service/api.service';
import { ConnectionValidationModalComponent } from './validations/connection-validation-modal/connection-validation-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './login/login/login.component';
import { ErrorInterceptor } from './_helpers/error-interceptor.service';
import { ReportsComponent } from './pages/reports/reports.component';
import { AdddocumentModule } from './pages/repository/document/modal/adddocument/adddocument.module';
import { LoadingInterceptor } from './_helpers/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SharedComponent,
    ReportsComponent,
    ConnectionValidationModalComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,  // Asegúrate de que AppRoutingModule esté incluido aquí
    RouterModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AdddocumentModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    ApiService,
    provideHttpClient(withFetch())
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
