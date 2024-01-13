import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthenticationService } from '../../authentication-service/authentication.service';
import { DataService } from '../../data-services/data.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  constructor(private authService: AuthenticationService, private dataService: DataService) {}

  isPanelOpen =  false;
  isFullScreen: boolean = true;

  userID: string = '';
  username: string = '';
  password: string = '';
  totalMoneySpend: string = '';
  totalTicketsBuyed: string = '';
  user: any[] = [];

  deleteUserID: string = '';
  editingUser: any;

  //This method is called when the component initializes
  ngOnInit(): void {
    const storedAdmins = localStorage.getItem('users_add');
    this.user = this.dataService.getUsers();
    this.checkLayout();
  }

  //Checks any change in the window
  onResize(event: Event): void {
    this.checkLayout();
  }
  
  //Checks if is full screen or halfscreen
  @HostListener('window:resize', ['$event'])
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

    const isDuplicateID = this.user.find(u => u.id === this.userID);
    if (isDuplicateID) {
      alert('An admin with the same ID already exists. Please use a different ID.');
      return;
    }

    if(this.userID < '1'){
      alert('Invalid ID.');
      return;
    }

    const newUser = {id: this.userID, username: this.username, password: this.password, totalMoneySpend: this.totalMoneySpend, totalTicketsBuyed: this.totalTicketsBuyed};
    this.user.push(newUser);
    this.dataService.setUsers(this.user);
    this.onClearAdd();
  }

  onDelete(): void {
    if (!this.deleteUserID) {
      alert('Please enter the Admin ID to delete.');
      return;
    }

    const index = this.user.findIndex(u => u.id === this.deleteUserID);

    if (index !== -1) {
      // Remove the admin from the array
      this.user.splice(index, 1);

      // Save the updated data to local storage
      this.dataService.setUsers(this.user);

      // Clear the deleteAdminID field
      this.deleteUserID = '';
    } else {
      alert('Admin not found with the specified ID.');
    }
  }

  //Method called when user clicks the clear button to clear the fields
  onClearAdd(): void {
    this.userID = '';
    this.username = '';
    this.password = '';
    this.totalMoneySpend = '';
    this.totalTicketsBuyed = '';
  }

  onClearDelete(){
    this.deleteUserID = '';
  }

  onRowEditInit(user: any): void {
    this.editingUser = { ...user };
  }

  onRowEditSave(user: any): void {
    // Find the index of the edited admin in the admin array
    const index = this.user.findIndex(u => u.id === user.id);

    if (index !== -1) {
      // Update the admin in the array with the edited values
      this.user[index] = { ...user };
      
      // Save the updated data to local storage
      this.dataService.setUsers(this.user);
    }

    // Reset the editingAdmin
    this.editingUser = null
  }

  onRowEditCancel(user: any): void {
    if (this.editingUser) {
      const originalUserIndex = this.user.findIndex(u => u.id === this.editingUser.id);

      if (originalUserIndex !== -1) {
        // Reset the editingAdmin to its original state
        this.user[originalUserIndex] = { ...this.editingUser };
      } else {
        // Handle the case where the original admin is not found (e.g., it was deleted)
        console.error('Original admin not found. Handle this case appropriately.');
      }
    }

    // Reset the editingAdmin
    this.editingUser = null;
  }
  

}
