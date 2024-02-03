import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from '../../data-services/data.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: [MessageService]
})

export class CategoriesComponent {

  constructor(
    private dataService: DataService, 
    private messageService: MessageService
    ) {}

  isFullScreen: boolean = true;
  isPanelOpen =  false;

  input: string = '';
  formSubmitted = false;
  entries: any[] = [];
  event: any[] = [];

  selectedCategory: any = '';
  categories: any[] = [];

  //Method for toast messages
  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, key: 'bottomCenter' });
  }

  //This method is called when the component initializes
  ngOnInit(): void {
    this.entries = this.dataService.getCategories();
    this.categories = this.dataService.getCategories();

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


  //When the submit button is clicked a new table is added
  onSubmit(): void {
    if (!this.input) {
      this.showToast('warn', 'Warning', 'Please fill the title field before submitting.');
      return;
    }else{
      const newEntry = { 
        title: this.input,
       };

      this.entries.push(newEntry);

      // Save data to localStorage
      this.dataService.setCategories(this.entries);

      this.formSubmitted = true;
    }
  }

  //Method called when user clicks the clear button to clear the fields
  onClearAdd(): void {
    this.input = '';
  }

  onClearDelete(){
    this.selectedCategory = '';
  }

  onDelete() {

    if (!this.selectedCategory) {
      this.showToast('warn', 'Warning', 'Please select a category before deleting.');
      return;
    }

    const index = this.entries.findIndex(entry => entry.title === this.selectedCategory.title);

    if (index !== -1) {
      // Remove the selected category from the entries array
      this.entries.splice(index, 1);

      // Save updated data to the service after deleting the specific category
      this.dataService.setCategories(this.entries);

      // Clear the selected category after deletion
      this.selectedCategory = '';
    }
  }

}
