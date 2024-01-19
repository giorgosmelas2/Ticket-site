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

  showForgotPasswordInput: boolean = false;
  forgotPasswordEmail: string = '';

  
  async onLogin() {

    if(!this.username || !this.password){
      alert('Please fill the fields.');
      return;
    }

    try{
      const response = await fetch('http://localhost:3500/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        credentials: 'include',
        body: JSON.stringify({  
            "usernameOrEmail": this.username, "pwd": this.password
          }),
        });

        if(response.ok){
          this.authService.login(this.username);
          this.router.navigate(['/main-content'])
        }else{
          alert('Wrong username or password.')
        }

      }catch(err){
        console.log(err);
      }

      // this.authService.login(this.username);
      // this.router.navigate(['/main-content'])
    }

    sendForgotPasswordEmail() {
      if(this.showForgotPasswordInput && this.forgotPasswordEmail){
        alert('check your emails.')
        this.showForgotPasswordInput = false;
        this.forgotPasswordEmail = '';
      }else{
        alert('Fill the email field.');
        return;
      }
    }

    
}
