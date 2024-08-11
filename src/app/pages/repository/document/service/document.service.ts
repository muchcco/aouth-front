import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = environment.apiUrl;

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
