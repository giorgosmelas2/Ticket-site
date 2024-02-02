import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-test',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginTestComponent {
  constructor(
    private router: Router,
    private authService: AuthenticationService, 
    private messageService: MessageService
    ) {}

  username: string = ''; 
  password: string = '';

  showForgotPasswordInput: boolean = false;
  forgotPasswordEmail: string = '';

  //Method for toast messages
  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, key: 'bottomCenter' });
  }

  
  async onLogin() {

    if(!this.username || !this.password){
      this.showToast('warn', 'Warning', 'Please fill the fields.');
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
          this.showToast('error', 'Error', 'Wrong username or password.');
        }

      }catch(err){
        console.log(err);
      }
    }

    sendForgotPasswordEmail() {
      if(this.showForgotPasswordInput && this.forgotPasswordEmail){
        this.showToast('success', 'Success', 'E-mail send! Please check your e-mails.');
        this.showForgotPasswordInput = false;
        this.forgotPasswordEmail = '';
      }else{
        this.showToast('warn', 'Warning', 'Please fill the email field.');
        return;
      }
    }

    
}
