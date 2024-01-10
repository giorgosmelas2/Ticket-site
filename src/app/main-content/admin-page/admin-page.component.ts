import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent {
  constructor(private authService: AuthenticationService) {}
 
  isFullScreen: boolean = true;
  isPanelOpen =  false;

  adminID: string = '';
  username:string = '';
  password: string = '';

  
  products: any[] = [
    // Your product data goes here
  ];

  statuses: { label: string, value: any }[] = [
    { label: 'Option 1', value: 'value1' },
    { label: 'Option 2', value: 'value2' },
  ];
  
  //This method is called when the component initializes
  ngOnInit(): void {
    this.checkLayout();
  }

  //Checks any change in the window
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkLayout();
  }

  //Checks for fullscreen or halfscreen
  private checkLayout(): void {
    this.isFullScreen = window.innerWidth > 768; 
  }

  
  //Method called when user clicks submit button
  onSubmit(): void {
    if(!this.adminID || !this.username || !this.password){
      alert('Please fill all flieds before submit');
    }
  }

  //Method called when user clicks the clear button to clear the fields
  onClear(): void {
    this.adminID = '';
    this.username = '';
    this.password = '';
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
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
