import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  constructor(private authService: AuthenticationService) {}


  userID: string = '';
  username: string = '';
  password: string = '';
  totalMoneySpend: string = '';
  totalTicketsBuyed: string = '';
  isPanelOpen =  false;
  isFullScreen: boolean = true;

    
  statuses: { label: string, value: any }[] = [
    { label: 'Option 1', value: 'value1' },
    { label: 'Option 2', value: 'value2' },
  ];

  rangeDates: any;
  products: any[] = [
    // Your product data goes here
  ];
  value: number = 1;

  //This method is called when the component initializes
  ngOnInit(): void {
    this.checkLayout();
  }

  //Checks any change in the window
  onResize(event: Event): void {
    this.checkLayout();
  }
  
  //Checks if is full screen or halfscreen
  private checkLayout(): void {
    this.isFullScreen = window.innerWidth > 768; 
  }

  //Checks if user is logged in
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  //Method called when user clicks submit button
  onSubmit(): void {
    if(!this.userID || !this.username || !this.password || !this.totalMoneySpend || !this.totalTicketsBuyed){
      alert('Please fill all flieds before submit');
    }
  }

  //Method called when user clicks the clear button to clear the fields
  onClear(): void {
    this.userID = '';
    this.username = '';
    this.password = '';
    this.totalMoneySpend = '';
    this.totalTicketsBuyed = '';
  }



  onRowEditInit(product: any): void {
    console.log('Editing initiated for product:', product);
    // Rest of the implementation
  }

  onRowEditSave(product: any): void {
    console.log('Editing initiated for product:', product);
    // Rest of the implementation
  }

  onRowEditCancel(product: any): void {
    console.log('Editing initiated for product:', product);
    // Rest of the implementation
  }

}
