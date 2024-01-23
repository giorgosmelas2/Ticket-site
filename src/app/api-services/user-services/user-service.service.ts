import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

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
    const userId = user.uid;
    const updatedUser = {
      username: user.username,
      total_tickets: user.total_tickets,
      total_money_spend: user.total_money_spend,
      password: user.password
    }
    return this.http.put(`${this.apiUrl}/users/${userId}`, updatedUser);
  }

  registerUser(user: any): Observable<any>{
    console.log("User:",user);
    const newUser = {
      email: user.email,
      username: user.username,
      role: 5150,
      total_tickets: 5,
      total_money_spend: 5,
      password: user.password
    }
    console.log("newUser:", newUser);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/register`, newUser, { headers });
  }

}
