import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedIn = true;
  private currentUser: string | null = null;

  login(username: string) {
    this.currentUser = username; // This variable is used for print the username in the down button in sidebar 
    this.isLoggedIn = true;
  }

  logout() {
    this.currentUser = null; //when the user is logged out the log in text appears again
    this.isLoggedIn = false;
  }

  //With this methods componets can check if user is logged in to show their content
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}
