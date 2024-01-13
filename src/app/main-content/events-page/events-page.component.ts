import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthenticationService } from '../../authentication-service/authentication.service';
import { DataService } from '../../data-services/data.service';


@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})

export class EventsPageComponent {
  constructor(private authService: AuthenticationService, private dataService: DataService) {}

  isFullScreen: boolean = true;
  isPanelOpen =  false;

  

  title: string = '';
  date: any;
  categories: any[] = [];
  description: string = '';
  coordinates: string = '';
  cover: File | null = null;
  tickets: string = '';
  price: string = '';
  selectedCategory: any = '';

  event: any[] = [];

  deleteEventID: string = '';
  editingEvent: any;
  
  
  statuses: { label: string, value: any }[] = [
    { label: 'Option 1', value: 'value1' },
    { label: 'Option 2', value: 'value2' },
  ];

  //This method is called when the component initializes
  ngOnInit(): void {
    const storedEntries = localStorage.getItem('categories_entries');
    this.categories = this.dataService.getEntries();
    this.event = this.dataService.getEvents();
    
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
    if (event.files.length > 0) {
      this.cover = event.files[0];
      console.log('File uploaded:', this.cover);
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  //Method called when user clicks submit button
  onSubmit(): void {
    if (
      !this.title ||
      !this.description ||
      !this.selectedCategory ||
      !this.coordinates ||
      !this.price ||
      !this.tickets ||
      !this.date
    ) {
      alert('Please fill all fields before submitting.');
      return;
    }

    const newEvent = {
      title: this.title,
      date: this.date,
      coordinates: this.coordinates,
      description: this.description,
      category: this.selectedCategory,
      cover: this.cover,
      tickets: this.tickets,
      price: this.price,

    };

    this.event.push(newEvent);
    this.dataService.setEvents(this.event);
    this.onClear();
  }

  //Method called when user clicks the clear button to clear the fields
  onClear(): void {
    this.title = '';
    this.description = '';
    this.selectedCategory = '';
    this.coordinates = '';
    this.price = '';
    this.tickets = '';
    this.date = '';
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
