import { Component, inject } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthenticationService } from '../../authentication-service/authentication.service';
import { MessageService } from 'primeng/api';
import { DataService } from '../../data-services/data.service';
import { UserServiceService } from '../../api-services/user-services/user-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  
  constructor(
    private authService: AuthenticationService, 
    private messageService: MessageService,
    private userService: UserServiceService,
    private dataService: DataService,
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
  userEmails: any[] = [];
  editingUser: any;


  //Method for toast messages
  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, key: 'bottomCenter' });
  }

  //This method is called when the component initializes
  async ngOnInit(): Promise<void> {
    this.checkLayout();
    // this.userService.getAllUsers()
    //   .subscribe(
    //     (data) => {
    //       this.user = data.filter(user => user.role === 2001);
    //       // console.log("user:", this.user);
    //       for(let i = 0; i< this.user.length; i++){
    //         const newEmail = {
    //           userEmail: this.user[i].email,
    //         };

    //         this.userEmails.push(newEmail);
    //       }

    //       this.dataService.setUserEmails(this.userEmails);
    //       this.userDropdownOptions = this.dataService.getUserEmails();
    
    //       console.log("userDropdownOptions", this.userDropdownOptions)
    //       this.isLoading = false;
    //     },
    //     (error) => {
    //       this.showToast('error', 'Error', 'Error loading users.');
    //       this.isLoading = false;
    //     }
    //   );

    try {
      await this.loadData();
      this.isLoading = false;
    } catch (error) {
      this.showToast('error', 'Error', 'Error loading users.');
      this.isLoading = false;
    }

    console.log("User Drop",this.userDropdownOptions)
  }

  private async loadData(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.userService.getAllUsers()
        .subscribe(
          (data) => {
            this.user = data.filter(user => user.role === 2001);
            for (let i = 0; i < this.user.length; i++) {
              const newEmail = {
                userEmail: this.user[i].email,
              };
              this.userEmails.push(newEmail);
            }
            this.dataService.setUserEmails(this.userEmails);
            this.userDropdownOptions = this.dataService.getUserEmails();
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
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
    if(!this.email || !this.username || !this.password){
      this.showToast('warn', 'Warning', 'Please fill all flieds before submit');
      return;
    }

    const isDuplicateID = this.user.find(u => u.id === this.email);
    if (isDuplicateID) {
      this.showToast('warn', 'Warning', 'An admin with the same ID already exists. Please use a different ID.');
      return;
    }

    if(this.email < '1'){
      this.showToast('warn', 'Warning', 'Invalid ID.');
      return;
    }

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
        },
        (error) => {
          this.showToast('error', 'Error', 'Error adding user.');
          console.log("Error in adding:",error);
        }
      )

    this.onClearAdd();
  }

  //This method called when we try to delete a user
  onDelete(): void {
    if (!this.deleteEmail) {
      this.showToast('warn', 'Warning', 'Please enter the User ID to delete.');
      return;
    }

    const userToDelete = this.user.find(u => u.email === this.deleteEmail);

    this.userService.deleteUser(userToDelete)
      .subscribe(
        (response) => {
          this.showToast('success', 'Success', 'User deleted successfully.');
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

  //Method called when user clicks the clear button to clear the fields 
  onClearAdd(): void {
    this.email = '';
    this.username = '';
    this.password = '';
    this.totalMoneySpend = '';
    this.totalTicketsBuyed = '';
  }

  //Method called when user clicks the clear button to clear the fields
  onClearDelete(){
    this.deleteEmail = '';
  }

  //Saves the user before changes
  onRowEditInit(user: any): void {
    this.editingUser = { ...user };
  }

  //Saves the changes into database
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

      if (originalUserIndex !== -1) {
        this.user[originalUserIndex] = { ...this.editingUser };
      } else {
        console.error('Original User not found. Handle this case appropriately.');
      }
    }
    this.editingUser = null;
  }
}
