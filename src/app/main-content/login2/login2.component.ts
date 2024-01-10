import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.css'
})
export class Login2Component {
  constructor(private authService: AuthenticationService) {}

  isLoggedIn: boolean = false;
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
      this.authService.login(this.username);
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
  }
}
