import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = 'http://190.187.182.55:8081/login/auth-backend/public/api'; // API DE CONSUMO

  constructor(private http: HttpClient, private router: Router) { }

  getTreeview(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/repository-treeview`);    
  }

  getDetail(category: string = ''): Observable<any> {
    let params = new HttpParams();
    if (category) {
      params = params.set('category', category);
    }
    return this.http.get<any>(`${this.apiUrl}/repository-list`, { params });
  }
}
