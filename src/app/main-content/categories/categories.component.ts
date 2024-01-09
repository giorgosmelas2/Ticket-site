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
  text: string = '';
  formSubmitted = false;
  entries: any[] = [];
  event: any[] = [];

  statuses: { label: string, value: any }[] = [
    { label: 'Option 1', value: 'value1' },
    { label: 'Option 2', value: 'value2' },
  ];

  

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  //When the submit button is clicked a new table is added
  onSubmit(): void {
    if (!this.text) {
      alert('Please fill in the title before submitting.');
      return;
    }else{
      const newEntry = { 
        title: this.text,
       };

      this.entries.push(newEntry);

      // Save data to localStorage
      // Save data to the service
      this.dataService.setEntries(this.entries);

      this.formSubmitted = true;
    }
  }

  onDelete(index: number) {
    // Remove the entry at the specified index
    this.entries.splice(index, 1);

    // Save updated data to the service after deleting the specific entry
    this.dataService.setEntries(this.entries);
  }
  
  //Checks for fullscreen or halfscreen  @HostListener('window:resize', ['$event'])
  @HostListener('window:resize', ['$event']) 
  onResize(event: Event): void {
    this.checkLayout();
  }

  //Checks for fullscreen or halfscreen
  ngOnInit(): void {
    // Retrieve data from localStorage on component initialization
    const storedEntries = localStorage.getItem('categories_entries');
    
    if (storedEntries) {
      this.entries = this.dataService.getEntries();
      this.formSubmitted = true;
    }

    this.checkLayout();
  }

  //Checks for fullscreen or halfscreen
  private checkLayout(): void {
    this.isFullScreen = window.innerWidth > 768; 
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
