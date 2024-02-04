import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { DataService } from '../../data-services/data.service';
import { MessageService } from 'primeng/api';
import { EventsServiceService } from '../../api-services/events-service/events-service.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})

export class EventsPageComponent {

  constructor(
    private dataService: DataService, 
    private messageService: MessageService,
    private eventService: EventsServiceService
    ) {}

  isFullScreen: boolean = true;
  isPanelOpen =  false;
  isLoading = true; 

  uploadedCoverPath: string | null = null;
  

  title: string = '';
  date: any;
  
  description: string = '';
  coordinates: string = '';
  cover: string| null = null;
  tickets: string = '';
  price: string = '';
  selectedCategory: any = '';

  event: any[] = [];

  //The categories that are avauliabe in categories page
  categories: any[] = [];

  deleteEventTitle: string = '';
  editingEvent: any;
  

  //Method for toast messages
  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, key: 'bottomCenter' });
  }

  //This method is called when the component initializes
  ngOnInit(): void {  
    this.checkLayout();
    this.eventService.getAllEvents()
      .subscribe(
        (data) => {
          this.event = data;
          this.isLoading = false;
          console.log(this.event[0].event_images[0]);
        },
        (error) => {
          this.showToast('error', 'Error', 'Error loading users.');
          console.log(error);
          this.isLoading = false;
        }
      );
    this.categories = this.dataService.getCategories();
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
    if (
      !this.title ||
      !this.description ||
      !this.selectedCategory ||
      !this.coordinates ||
      !this.price ||
      !this.tickets ||
      !this.date
    ) {
      this.showToast('warn', 'Warning', 'Please fill all fields before submitting.');
      return;
    }

    const isDublicateTitle = this.event.find(e => e.title === this.title);
    if(isDublicateTitle){
      this.showToast('warn', 'Warning', 'An event has the same title, please select another title.');
      return;
    }


    const newEvent = {
      title: this.title,
      date: this.date,
      coordinates: this.coordinates,
      description: this.description,
      category: this.selectedCategory,
      cover: this.uploadedCoverPath,
      tickets: this.tickets,
      price: this.price, 
    };

    this.event.push(newEvent);
    this.dataService.setEvents(this.event);
    this.onClearAdd();
    this.showToast('success', 'Success', 'Event added successfully.');
  }

  onDelete(){
    if (!this.deleteEventTitle) {
      this.showToast('warn', 'Warning', 'Please enter the Event title to delete.');
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


  onUpload(event: any) {
    const response = JSON.parse(event.xhr.response);

    if (response && response.files && response.files.length > 0) {
      this.uploadedCoverPath = response.files[0].path; // Save the uploaded image path
    }
    
  }

  //Determines which admin will be edited
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
      const originalEventIndex = this.event.findIndex(e => e.title === this.editingEvent.title);

      if (originalEventIndex !== -1) {
        this.event[originalEventIndex] = { ...this.editingEvent };
      } else {
        console.error('Original event not found. Handle this case appropriately.');
      }
    }
    this.editingEvent = null;
  }


}
