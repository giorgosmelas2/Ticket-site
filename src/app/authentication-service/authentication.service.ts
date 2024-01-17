import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly USER_KEY = 'currentUser';
  private currentUser: string | null = null;


  login(username: string) {
    localStorage.setItem(this.USER_KEY, username); // This variable is used for print the username in the down button in sidebar 
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);//when the user is logged out the log in text appears again
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.USER_KEY);
  }
}
