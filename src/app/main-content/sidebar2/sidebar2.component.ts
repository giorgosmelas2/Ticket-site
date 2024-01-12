import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrl: './sidebar2.component.css'
})
export class Sidebar2Component {
  constructor(private authService: AuthenticationService) {}

  
  getText(text: string){
    return text;
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }

  getUsername(): string | null {
    return this.authService.getCurrentUser();
  }

}
