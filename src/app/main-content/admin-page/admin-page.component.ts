import { Component, ViewEncapsulation } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthenticationService } from '../../authentication-service/authentication.service';
import { DataService } from '../../data-services/data.service';
import { MessageService } from 'primeng/api';
import { AdminServiceService } from '../../api-services/admin-service/admin-service.service';
import { response } from 'express';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AdminPageComponent {
  constructor(private authService: AuthenticationService, 
    private dataService: DataService, 
    private messageService: MessageService,
    private adminService: AdminServiceService) {}
 
  isFullScreen: boolean = true;
  isPanelOpen =  false;
  isLoading = true;

  adminEmail: string = '';
  username:string = '';
  password: string = '';
  
  users: any[] = [];
  admin: any[] = [];


  deleteAdminID: string = '';
  editingAdmin: any;

  //Method for toast messages
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
          this.isLoading = false;
        },
        (error) => {
          this.showToast('error', 'Error', 'Error loading users.');
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

  
  //Method called when user clicks submit button
  onSubmit(): void {
    if(!this.adminEmail || !this.username || !this.password){
      this.showToast('warn', 'Warning', 'Please fill all fields before submitting.');
      return;
    }

    const isDuplicateID = this.admin.find(a => a.id === this.adminEmail);
    if (isDuplicateID) {
      this.showToast('warn', 'Warning', 'An admin with the same ID already exists. Please use a different ID.');
      return;
    }

    if(this.adminEmail < '1'){
      this.showToast('warn', 'Warning', 'Invalid ID.');
      return;
    }


    const newAdmin = {
      userEmail: this.adminEmail, 
      user: this.username, 
      pwd: this.password,
      role: 5150
    };
    
    this.adminService.registerAdmin(newAdmin)
      .subscribe(
        (response) => {
          this.showToast('success', 'Success', 'Admin added successfully.');
        },
        (error) =>{
          this.showToast('error', 'Error', 'Error adding admin.');
          console.log("Error in adding:",error);
        }
      )


    this.onClearAdd();

  }

  onDelete(): void {
    if (!this.deleteAdminID) {
      this.showToast('warn', 'Warning', 'Please enter the Admin ID to delete.');
      return;
    }

    const index = this.admin.findIndex(a => a.id === this.deleteAdminID);

    if (index !== -1) {
      // Remove the admin from the array
      this.admin.splice(index, 1);

      // Save the updated data to local storage
      this.dataService.setAdmins(this.admin);

      // Clear the deleteAdminID field
      this.deleteAdminID = '';
    } else {
      alert('Admin not found with the specified ID.');
    }
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
    this.adminEmail = '';
    this.username = '';
    this.password = '';
  }

  onClearDelete(){
    this.deleteAdminID = '';
  }

  //Determines which admin will be edited
  onRowEditInit(admin: any): void {
    this.editingAdmin = { ...admin };
  }

  //Saves the changes
  onRowEditSave(admin: any): void {
    const index = this.admin.findIndex(a => a.id === admin.id);

    if (index !== -1) {
      this.admin[index] = { ...admin };
      this.dataService.setAdmins(this.admin);
    }
    
    this.editingAdmin = null;
  }

  //Discards the changes
  onRowEditCancel(admin: any): void {
    if (this.editingAdmin) {
      const originalAdminIndex = this.admin.findIndex(a => a.id === this.editingAdmin.id);

      if (originalAdminIndex !== -1) {
        // Reset the editingAdmin to its original state
        this.admin[originalAdminIndex] = { ...this.editingAdmin };
      } else {
        // Handle the case where the original admin is not found (e.g., it was deleted)
        console.error('Original admin not found. Handle this case appropriately.');
      }
    }
    
    this.editingAdmin = null;
  }
}
