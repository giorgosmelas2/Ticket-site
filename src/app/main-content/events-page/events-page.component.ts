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

  uploadedCoverPath: string | null = null;
  

  title: string = '';
  date: any;
  
  description: string = '';
  coordinates: string = '';
  uploadedCoverUrl: string| null = null;
  tickets: string = '';
  price: string = '';
  selectedCategory: any = '';

  event: any[] = [];

  //The categories that are avauliabe in categories page
  categories: any[] = [];

  deleteEventTitle: string = '';
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

    const isDublicateTitle = this.event.find(e => e.title === this.title);
    if(isDublicateTitle){
      alert('An event has the same title, please select another title.');
      return;
    }

    const newEvent = {
      title: this.title,
      date: this.date,
      coordinates: this.coordinates,
      description: this.description,
      category: this.selectedCategory,
      cover: this.uploadedCoverUrl,
      tickets: this.tickets,
      price: this.price,

    };
    console.log(this.selectedCategory);

    this.event.push(newEvent);
    this.dataService.setEvents(this.event);
    this.onClearAdd();
  }

  onDelete(){
    if (!this.deleteEventTitle) {
      alert('Please enter the Admin ID to delete.');
      return;
    }

    const index = this.event.findIndex(e => e.title === this.deleteEventTitle);

    if (index !== -1) {
      this.event.splice(index, 1);
      this.dataService.setEvents(this.event);
      this.deleteEventTitle = '';
    } else {
      alert('Admin not found with the specified ID.');
    }

    this.onClearDelete();
  }
  
  //Method called when user clicks the clear button to clear the fields
  onClearAdd(): void {
    this.title = '';
    this.description = '';
    this.selectedCategory = '';
    this.coordinates = '';
    this.price = '';
    this.tickets = '';
    this.date = '';
  }

  onClearDelete(){
    this.deleteEventTitle = '';
  }



  onRowEditInit(event: any): void {
    this.editingEvent= { ...event };
  }

  onRowEditSave(event: any): void {
    const index = this.event.findIndex(e => e.title === event.title);

    if (index !== -1) {
      this.event[index] = { ...event };
      this.dataService.setEvents(this.event);
    }
    
    this.editingEvent = null;
  }

  //Discards the changes
  onRowEditCancel(event: any): void {
    if (this.editingEvent) {
      const originalEventIndex = this.event.findIndex(e => e.id === this.editingEvent.title);

      if (originalEventIndex !== -1) {
        this.event[originalEventIndex] = { ...this.editingEvent };
      } else {
        console.error('Original admin not found. Handle this case appropriately.');
      }
    }
    this.editingEvent = null;
  }
  

}
