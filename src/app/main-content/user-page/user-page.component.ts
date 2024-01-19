import { Component, inject } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthenticationService } from '../../authentication-service/authentication.service';
import { DataService } from '../../data-services/data.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  constructor(private authService: AuthenticationService, private dataService: DataService, private http: HttpClient, private messageService: MessageService) {}

  isPanelOpen =  false;
  isFullScreen: boolean = true;
  isLoading = true; 

  userID: string = '';
  username: string = '';
  password: string = '';
  totalMoneySpend: string = '';
  totalTicketsBuyed: string = '';
  user: any[] = [];

  deleteUserID: string = '';
  editingUser: any;


  //Method for toast messages
  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, key: 'bottomCenter' });
  }

  //This method is called when the component initializes
  ngOnInit(): void {
    this.checkLayout();

    this.http.get<any[]>('http://localhost:3500/users')
      .subscribe(
        (data) => {
          this.user = data;
          this.isLoading = false;
          
          console.log(this.user);
        },
        (error) => {
          console.error('Error fetching users from API:', error);
          this.isLoading = false;
        }
      );

    
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
      this.showToast('warn', 'Warning', 'Please fill all flieds before submit');
      return;
    }

    const isDuplicateID = this.user.find(u => u.id === this.userID);
    if (isDuplicateID) {
      this.showToast('warn', 'Warning', 'An admin with the same ID already exists. Please use a different ID.');
      return;
    }

    if(this.userID < '1'){
      this.showToast('warn', 'Warning', 'Invalid ID.');
      return;
    }

    const newUser = {uid: this.userID, email: '', username: this.username, role: 5150, total_tickets: this.totalTicketsBuyed, total_money_spend:this.totalMoneySpend, password: this.password};
    this.onClearAdd();
    this.showToast('success', 'Success', 'User added successfully.');
  }

  onDelete(): void {
    if (!this.deleteUserID) {
      this.showToast('warn', 'Warning', 'Please enter the User ID to delete.');
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

  getFirst12Characters(inputString: string): string {
    const maxLength = 12;

    if (inputString.length <= maxLength) {
      return inputString;
    } else {
      return inputString.substring(0, maxLength) + '...';
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
    console.log('onRowEditSave called with user:', user);
    const index = this.user.findIndex(u => u.uid === user.uid);

    console.log('Index found:', index);
    if (index !== -1) {
      this.http.put(`http://localhost:3500/users/${user.uid}`, user)
        .subscribe(
          (updatedUser) => {
            // The API may return the updated user; use it if needed
            console.log('User updated successfully:', updatedUser);

            // You may choose to update the local array or perform additional actions
            // For example, you can update the local array if you still need it:
            this.user[index] = { ...user };
            this.editingUser = null; // Reset the editingUser
          },
          (error) => {
            console.error('Error updating user:', error);
            // Handle the error as needed
          }
        );
    }
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
