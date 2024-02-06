import { Component, inject } from '@angular/core';
import { HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserServiceService } from '../../api-services/user-services/user-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  
  constructor( 
    private messageService: MessageService,
    private userService: UserServiceService,
    ) {}

  isPanelOpen =  false;
  isFullScreen: boolean = true;
  isLoading = true; 

  email: string = '';
  username: string = '';
  password: string = '';
  totalMoneySpend: string = '';
  totalTicketsBuyed: string = '';
  user: any[] = [];

  deleteEmail: string = '';
  userDropdownOptions: any[] = [];

  editingUser: any;


  //Method for toast messages format
  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, key: 'bottomCenter' });
  }

  //This method is called when the component initializes
  ngOnInit(): void {
    this.checkLayout();
    this.userService.getAllUsers()
        .subscribe(
          (data) => {
            this.user = data.filter(user => user.role === 2001);
            for( let i = 0; i<this.user.length; i++ ){
              this.userDropdownOptions[i] = this.user[i].email;
            }
            this.isLoading = false;
          },
          (error) => {
            this.showToast('error', 'Error', 'Error loading users.');
            console.log(error);
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

  //Method called when user clicks submit button
  onSubmit(): void {

    if(!this.isValidEmail(this.email)){
      this.showToast('warn', 'Warning', 'Please give a right email.');
      return;
    }

    //Creating a variable with right format for database
    const newUser = {
      userEmail: this.email,
      user: this.username,
      pwd: this.password,
      role: 2001
    };

    this.userService.registerUser(newUser)
      .subscribe(
        (response) => {
          this.showToast('success', 'Success', 'User added successfully.');
          console.log(response);            
        },
        (error) => {
          //Checks if fields are filled
          if(error.status == 400){
            this.showToast('warn', 'Warning', 'Please fill all fields before submitting.');
            console.log(error);
          }

          //Checks for duplicate user
          if(error.status == 409){
            this.showToast('error', 'Error', 'Error adding user.');
            console.log("Error in adding:",error);
          }
          
        }
      )

    this.onClearAdd();
  }

  //Email check.
  private isValidEmail(email: string): boolean {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onDelete(): void {
    if (!this.deleteEmail) {
      this.showToast('warn', 'Warning', 'Please enter the User ID to delete.');
      return;
    }

    //Finds the user by maching the choosen email with emails from user array
    const userToDelete = this.user.find(u => u.email === this.deleteEmail);

    this.userService.deleteUser(userToDelete)
      .subscribe(
        (response) => {
          this.showToast('success', 'Success', 'User deleted successfully.');
          console.log(response);
        },
        (error) => {
          this.showToast('error', 'Error', 'Error deleting user.');
          console.log("Error in adding:",error);
        }
      )
  }

  //Shows only 12 chars in the matrix's cells
  getFirst12Characters(inputString: string): string {
    if (inputString.length <= 12) {
      return inputString;
    } else {
      return inputString.substring(0, 12) + '...';
    }
  
  }

  //Clears fields in add panel
  onClearAdd(): void {
    this.email = '';
    this.username = '';
    this.password = '';
    this.totalMoneySpend = '';
    this.totalTicketsBuyed = '';
  }

  //Clears field in delete panel
  onClearDelete(){
    this.deleteEmail = '';
  }

  //Makes a copy from the admin object before editing if user discards changes 
  onRowEditInit(user: any): void {
    this.editingUser = { ...user };
  }

  //Saves the changes
  onRowEditSave(user: any): void {
    this.userService.updateUser(user)
      .subscribe(
        (updatedUser) => {
          this.showToast('success', 'Success', 'User updated successfully.');
        },
        (error) => {
          this.showToast('error', 'Error', 'An error has occured.');
          console.error('Error updating user:', error);
        }
      );
  }

  //Discards changes
  onRowEditCancel(user: any): void {
    if (this.editingUser) {
      const originalUserIndex = this.user.findIndex(u => u.uid === this.editingUser.uid);
      if (originalUserIndex) {
        this.user[originalUserIndex] = { ...this.editingUser };
      } else {
        console.error('Original User not found. Handle this case appropriately.');
      }
    }
    this.editingUser = null;
  }
}
