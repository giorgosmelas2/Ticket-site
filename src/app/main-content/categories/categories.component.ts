import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from '../../data.service';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: [MessageService]
})

export class CategoriesComponent {

  constructor(private authService: AuthenticationService, private dataService: DataService) {}

  isFullScreen: boolean = true;
  isPanelOpen =  false;

  input: string = '';
  formSubmitted = false;
  entries: any[] = [];
  event: any[] = [];

  statuses: { label: string, value: any }[] = [
    { label: 'Option 1', value: 'value1' },
    { label: 'Option 2', value: 'value2' },
  ];

  // //This method is called when the component initializes
  ngOnInit(): void {
    const storedEntries = localStorage.getItem('categories_entries');
    this.entries = this.dataService.getEntries();
    this.formSubmitted = true;
    
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

  //Checks if user has logged in
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  //When the submit button is clicked a new table is added
  onSubmit(): void {
    if (!this.input) {
      alert('Please fill in the field before submitting.');
      return;
    }else{
      const newEntry = { 
        title: this.input,
       };

      this.entries.push(newEntry);

      // Save data to localStorage
      this.dataService.setEntries(this.entries);

      this.formSubmitted = true;
    }
  }

  //Method called when user clicks the clear button to clear the fields
  onClear(): void {
    this.input = '';
    
  }

  onDelete(index: number) {
    // Remove the entry at the specified index
    this.entries.splice(index, 1);

    // Save updated data to the service after deleting the specific entry
    this.dataService.setEntries(this.entries);
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
