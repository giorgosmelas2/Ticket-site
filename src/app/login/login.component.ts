import { Component } from '@angular/core';
import { AuthenticationService } from '../api-services/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { response } from 'express';

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
  ) { }

  username: string = '';
  password: string = '';

  showForgotPasswordInput: boolean = false;
  forgotPasswordEmail: string = '';

  //Method for toast messages
  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, key: 'bottomCenter' });
  }

  onLogin() {

    if (!this.username || !this.password) {
      this.showToast('warn', 'Warning', 'Please fill the fields.');
      return;
    }

    this.authService.login(this.username, this.password)
      .subscribe(
        (response) => {
          this.authService.setCurrentUser(this.username);
          this.router.navigate(['/main-content'])
        },
        (error) => {
          //Checks if fields are filled
          if (error.status == 400) {
            this.showToast('warn', 'Warning', 'Please fill all fields.');
            console.log(error);
          }

          //Wrong username or password
          if (error.status == 401) {
            this.showToast('error', 'Error', 'Wrong username or password.');
            console.log(error);
          }
        }
      )
  }

  //Sents an email to changes your password
  sendForgotPasswordEmail() {
    if (this.showForgotPasswordInput && this.forgotPasswordEmail) {
      const email = {
        reqUserEmail: this.forgotPasswordEmail
      }
      this.authService.forgotPassword(email)
        .subscribe(
          (response) => {
            this.showToast('success', 'Success', 'E-mail send! Please check your e-mails.');
            this.showForgotPasswordInput = false;
            this.forgotPasswordEmail = '';
          },
          (error) => {
            //Checks if the field is filled
            if (error.status == 400) {
              this.showToast('warn', 'Warning', 'Please fill the email field.');
              console.log(error);
            }

            //Wrong email
            if (error.status == 401) {
              this.showToast('error', 'Error', 'Wrong e-mail');
              console.log(error);
            }

          }
        )


    } else {
      this.showToast('warn', 'Warning', 'Please fill the email field.');
      return;
    }
  }
}
