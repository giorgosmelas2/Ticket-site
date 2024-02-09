import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient) {}

  private apiUrl = "http://localhost:3500";
  private readonly USER_KEY = 'currentUser';


  login(username: string, password: string){
    const userDetails = {
      usernameOrEmail: username,
      pwd: password
    }
    return this.http.post(`${this.apiUrl}/auth`, userDetails);
  }

  logout() {
    return this.http.get(`${this.apiUrl}/logout`)
  }

  deleteCurrentUser(){
    localStorage.removeItem(this.USER_KEY);
  }

  setCurrentUser(username: string) {
    localStorage.setItem(this.USER_KEY, username); // This variable is used for print the username in the down button in sidebar 
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.USER_KEY);
  }

  forgotPassword(email: any) {
    return this.http.post(`${this.apiUrl}/forgotPassword`, email);
  }
}
