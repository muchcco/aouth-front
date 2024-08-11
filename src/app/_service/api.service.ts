import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private primaryApiUrl = environment.apiUrl;

  // private apiUrl: string = this.primaryApiUrl;

  // constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const cachedUrl = localStorage.getItem('apiUrl');
  //     if (cachedUrl) {
  //       this.apiUrl = cachedUrl;
  //       // console.log(`Using cached API URL: ${this.apiUrl}`);
  //     }
  //   }
  // }

  // public initializeApiUrl(): Observable<void> {
  //   if (!isPlatformBrowser(this.platformId)) {
  //     return of(undefined);
  //   }

  //   // console.log('Checking primary API URL...');
  //   return this.checkApiUrlAvailability(this.primaryApiUrl).pipe(
  //     tap((available: boolean) => {
  //       if (available) {
  //         this.apiUrl = this.primaryApiUrl;
  //         localStorage.setItem('apiUrl', this.apiUrl);
  //         // console.log(`Using API URL: ${this.apiUrl}`);
  //       }
  //     }),
  //     map(() => undefined)
  //   );
  // }

  // private checkApiUrlAvailability(url: string): Observable<boolean> {
  //   return this.http.get(url, { observe: 'response' }).pipe(
  //     map((response: any) => response.status === 200),
  //     catchError(() => of(false))
  //   );
  // }

  // getApiUrl(): string {
  //   return this.apiUrl;
  // }
}
