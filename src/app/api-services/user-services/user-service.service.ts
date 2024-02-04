import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    console.log("update user:", user)

    const updatedUser = {
      email: user.email,
      username: user.username,
      tota_tickets: user.tota_tickets,
      total_money_spend: user.total_money_spend
    }

    return this.http.put(`${this.apiUrl}/users/${user.uid}`, updatedUser);
  }

  registerUser(user: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  deleteUser(user: any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/users/${user.uid}`);
  }

}
