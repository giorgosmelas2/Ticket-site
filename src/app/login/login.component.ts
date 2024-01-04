import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {}
  
  email: string = ''; 
  value: string = '';
  isLoggedIn = false;

  

  onLogin() {
    // Perform login logic if needed
    console.log('Logging in...');
    // Navigate to the main-content route
    this.router.navigate(['/main']);
  }
}
