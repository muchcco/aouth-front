import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntitymacService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getEntity(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/entity-list`);
  }

  getEntityName(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/entity-details`);
  }

  getMac(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/entity-details`);
  }

  getEntityStore(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/entity-store`, data);
  }

  saveModalEntity(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/entity-modal-store`, data);
  }
}
