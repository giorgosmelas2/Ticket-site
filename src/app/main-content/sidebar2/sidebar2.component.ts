import { Component } from '@angular/core';
import { AuthenticationService } from '../../api-services/authentication-service/authentication.service';
import { response } from 'express';

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrl: './sidebar2.component.css'
})
export class Sidebar2Component {
  constructor(private authService: AuthenticationService) {}

  buttonText: string = '';

  onLogout() {
    this.authService.logout()
      .subscribe(
        (response) => {
          this.authService.deleteCurrentUser();
        },
        (error) => {
          console.log(error);
        } 
      )
  }

  getUsername(): string | null {
    return this.authService.getCurrentUser();
  }

  //Changes text on hover
  onMouseEnter() {
    this.buttonText = 'Logout';
  }

  //Resets the username
  onMouseLeave() {
    this.buttonText = this.getUsername() || '';
  }

  //Shows only 12 chars in the matrix's cells
  getFirst12Characters(inputString: string ): string {
    if (inputString.length <= 12) {
      return inputString;
    } else {
      return inputString.substring(0, 12) + '...';
    }
  
  }

}
