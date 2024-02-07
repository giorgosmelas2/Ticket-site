import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3500';

  getAllUsers(){
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${user.uid}`, user);
  }

  registerUser(user: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  deleteUser(user: any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/users/${user.uid}`);
  }

}
