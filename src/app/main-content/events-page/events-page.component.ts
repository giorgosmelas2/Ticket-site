import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})

export class EventsPageComponent {
  constructor(private authService: AuthenticationService, private dataService: DataService) {}

  isFullScreen: boolean = true;
  isPanelOpen =  false;
  rangeDates: any;
  title: string = '';
  description: string = '';
  coordinates: string = '';
  tickets: string = '';
  price: string = '';
  selectedCategory: any = '';
  categories: any[] = [];
  event: any[] = [];
  value: number = 1;
  
  statuses: { label: string, value: any }[] = [
    { label: 'Option 1', value: 'value1' },
    { label: 'Option 2', value: 'value2' },
  ];

  //This method is called when the component initializes
  ngOnInit(): void {
    const storedEntries = localStorage.getItem('categories_entries');
    this.categories = this.dataService.getEntries();
    
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

  // Uploads the photo
  onUpload(event: any) {
    console.log('File uploaded!', event);
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  //Method called when user clicks submit button
  onSubmit(): void {
    if(!this.title || !this.description || !this.selectedCategory || !this.coordinates || !this.price || !this.tickets || !this.rangeDates){
      alert('Please fill all flieds before submit');
    }
  }

  //Method called when user clicks the clear button to clear the fields
  onClear(): void {
    this.title = '';
    this.description = '';
    this.selectedCategory = '';
    this.coordinates = '';
    this.price = '';
    this.tickets = '';
    this.rangeDates = '';
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
