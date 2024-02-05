import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminServiceService } from '../../api-services/admin-service/admin-service.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})

export class AdminPageComponent {
  constructor( 
    private messageService: MessageService,
    private adminService: AdminServiceService
    ) {}
 
  isFullScreen: boolean = true;
  isPanelOpen =  false;
  isLoading = true;

  adminEmail: string = '';
  username:string = '';
  password: string = '';
  
  users: any[] = [];
  admin: any[] = [];

  deleteEmail: string = '';
  adminDropdownOptions: any[] = [];

  editingAdmin: any;

  //Method for toast messages format
  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, key: 'bottomCenter' });
  }

  //This method is called when the component initializes
  ngOnInit(): void {
    this.checkLayout();
    this.adminService.getAllUsers()
    .subscribe(
      (data) => {
        this.admin = data.filter(admin => admin.role === 5150);
        for( let i = 0; i<this.admin.length; i++){
          this.adminDropdownOptions[i] = this.admin[i].email; 
        }
        this.isLoading = false;
      },
      (error) => {
        this.showToast('error', 'Error', 'Error loading admins.');
        console.log(error);
        this.isLoading = false;
      }
    );
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

  onSubmit(): void {
    
    //Creating a variable with right format for database
    const newAdmin = {
      userEmail: this.adminEmail, 
      user: this.username, 
      pwd: this.password,
      isAdmin: true
    };
    
    this.adminService.registerAdmin(newAdmin)
      .subscribe(
        (response) => {
          this.showToast('success', 'Success', 'Admin added successfully.');
          console.log(response);
          
        },
        (error) =>{
          //Checks if fields are filled
          if(error.status == 400){
            this.showToast('warn', 'Warning', 'Please fill all fields before submitting.');
            console.log(error);
          }

          //Checks for duplicate admin
          if(error.status == 409){
            this.showToast('error', 'Error', 'Error adding admin.');
            console.log("Error in adding:",error);
          }
          
        }
      )
    this.onClearAdd();
    this.ngOnInit();
  }

  onDelete(): void {    
    if (!this.deleteEmail) {
      this.showToast('warn', 'Warning', 'Please select the Admin email to delete.');
      return;
    }

    //Finds the user by maching the choosen email with emails from admin array
    const userToDelete = this.admin.find(u => u.email === this.deleteEmail);
    this.adminService.deleteAdmin(userToDelete)
      .subscribe(
        (response) => {
          this.showToast('success', 'Success', 'Admin deleted successfully.');
          console.log(response);
        },
        (error) => {
          this.showToast('error', 'Error', 'Error deleting admin.');
          console.log("Error in adding:",error);
        }
      )
  }

  //Shows only 20 chars in the matrix's cells
  getFirst20Characters(inputString: string): string {
    if (inputString.length <= 20) {
      return inputString;
    } else {
      return inputString.substring(0, 20) + '...';
    }
  }
  
  //Clears fields in add panel
  onClearAdd(): void {
    this.adminEmail = '';
    this.username = '';
    this.password = '';
  }

  //Clears field in delete panel
  onClearDelete(){
    this.deleteEmail = '';
  }

  //Makes a copy from the admin object before editing if user discards changes 
  onRowEditInit(admin: any): void {
    this.editingAdmin = { ...admin }; 
  }

  //Saves the changes
  onRowEditSave(admin: any): void {

    var updatedAdmin;
    const originalAdminIndex = this.admin.findIndex(a => a.uid === this.editingAdmin.uid);

    if(this.admin[originalAdminIndex].email === admin.email){
      updatedAdmin = {
        uid: admin.uid,
        username: admin.username,
        pwd: admin.pwd,
        total_tickets: admin.total_tickets,
        total_money_spend: admin.total_money_spend
      }; 
    }else{
      updatedAdmin = {
        uid: admin.uid,
        email: admin.email,
        username: admin.username,
        pwd: admin.pwd,
        total_tickets: admin.total_tickets,
        total_money_spend: admin.total_money_spend
      }; 
    }

    this.adminService.updateAdmin(updatedAdmin)
      .subscribe(
        (updatedAdmin) => {
          this.showToast('success', 'Success', 'Admin updated successfully.');
          console.log(updatedAdmin);
        },
        (error) => {
          this.showToast('error', 'Error', 'An error has occured.');
          console.error('Error updating admin:', error);
        }
      )
  }

  //Discards the changes
  onRowEditCancel(admin: any): void {
    if (this.editingAdmin) {
      const originalAdminIndex = this.admin.findIndex(a => a.uid === this.editingAdmin.uid);
      if (originalAdminIndex) {
        this.admin[originalAdminIndex] = { ...this.editingAdmin };
      } else {
        console.error('Original admin not found. Handle this case appropriately.');
      }
    }
    this.editingAdmin = null;
  }
}
