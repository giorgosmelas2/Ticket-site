import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-test',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginTestComponent {
  constructor(private router: Router,private authService: AuthenticationService) {}

  username: string = ''; 
  password: string = '';

  
  onLogin() {
    const predefinedUsername = 'admin';
    const predefinedPassword = 'password';

    if(!this.username || !this.password){
      alert('Please fill the fields.');
      return;
    }

    if(this.username == predefinedUsername && this.password == predefinedPassword){
      this.authService.login(predefinedUsername);
      this.router.navigate(['/main-content'])
    }else{
      alert('wrong')
    }
    
   }

   
}
