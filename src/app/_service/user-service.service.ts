import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Método para obtener los perfiles asociados al nombre de usuario
  getUserByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user-profile/${name}`);
  }
}
