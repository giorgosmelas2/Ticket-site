import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3500';

  getAllUsers(){
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  updateAdmin(admin: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${admin.uid}`, admin);
  }

  registerAdmin(admin: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, admin);
  }

  deleteAdmin(admin: any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/users/${admin.uid}`);
  }
}
