import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users-list`);
  }

  getPersonalM(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user-personal`);
  }

  saveUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-store`, user);
  }

  getUserEdit(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-edit?id=${id}`);
  }
  
  updateUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-update`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-password`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-delete`, { id });
  }
}
