import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthenticationService } from '../../authentication-service/authentication.service';
import { DataService } from '../../data-services/data.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent {
  constructor(private authService: AuthenticationService, private dataService: DataService) {}
 
  isFullScreen: boolean = true;
  isPanelOpen =  false;

  adminID: string = '';
  username:string = '';
  password: string = '';
  
  admin: any[] = [];

  deleteAdminID: string = '';
  editingAdmin: any;

  
  //This method is called when the component initializes
  ngOnInit(): void {
    const storedAdmins = localStorage.getItem('admins_add');
    this.admin = this.dataService.getAdmins();
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
      return
    }

    const isDuplicateID = this.admin.find(a => a.id === this.adminID);
    if (isDuplicateID) {
      alert('An admin with the same ID already exists. Please use a different ID.');
      return;
    }

    if(this.adminID < '1'){
      alert('Invalid ID.');
      return;
    }


    const newAdmin = {id: this.adminID, username: this.username, password: this.password};
    this.admin.push(newAdmin);
    this.dataService.setAdmins(this.admin);
    this.onClearAdd();
  }

  onDelete(): void {
    if (!this.deleteAdminID) {
      alert('Please enter the Admin ID to delete.');
      return;
    }

    const index = this.admin.findIndex(admin => admin.id === this.deleteAdminID);

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
  

  //Method called when user clicks the clear button to clear the fields
  onClearAdd(): void {
    this.adminID = '';
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
    // Find the index of the edited admin in the admin array
    const index = this.admin.findIndex(a => a.id === admin.id);

    if (index !== -1) {
      // Update the admin in the array with the edited values
      this.admin[index] = { ...admin };
      
      // Save the updated data to local storage
      this.dataService.setAdmins(this.admin);
    }

    // Reset the editingAdmin
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

    // Reset the editingAdmin
    this.editingAdmin = null;
  }
}
