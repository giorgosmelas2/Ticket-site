import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
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
