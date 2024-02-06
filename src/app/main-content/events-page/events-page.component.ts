import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { DataService } from '../../data-services/data.service';
import { MessageService } from 'primeng/api';
import { EventsServiceService } from '../../api-services/events-service/events-service.service';
import { response } from 'express';

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
  date: Date[] = [];
  
  description: string = '';
  coordinates: string = '';
  cover: File | null = null;
  tickets: string = '';
  price: string = '';
  selectedCategory: any = '';

  event: any[] = [];

  //The categories that are avauliabe in categories page
  categories: any[] = [];

  deleteTitle: string = '';
  eventDropdownOptions: any[] = [];

  newDates: any;

  editingEvent: any;
  selectedFileName: string = '';

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
          for( let i = 0; i<this.event.length; i++){
            this.eventDropdownOptions[i] = this.event[i].event_name; 
          }
          console.log(this.event)
          this.isLoading = false;
          
        },
        (error) => {
          this.showToast('error', 'Error', 'Error loading users.');
          console.log(error);
          this.isLoading = false;
        }
      );
    this.categories = this.dataService.getCategories();

  }

  getTicketsRange(event: any): number[] {
    return Array.from({length: event.max_tickets}, (_, index) => index + 1);
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

    

    const eventsDatesandTickets = this.date.map(date => ({
      date: date.toISOString(),
      max_tickets: parseInt(this.tickets)
    }));
  
    console.log("Events Dates and Tickets", eventsDatesandTickets);

    console.log("Date",this.date)
    const newEvent = {
      eventName: this.title,
      description: this.description,
      category: this.selectedCategory,
      dates : eventsDatesandTickets,
      coordinates: this.coordinates,
      ticketPrice: parseInt(this.price), 
      files: this.cover
    };
    
    console.log("New Event", newEvent);

    this.eventService.addEvent(newEvent)
      .subscribe(
        (response) => {
          this.showToast('success', 'Success', 'Event added successfully.');
          console.log(response);
        },
        (error) => {
          this.showToast('error', 'Error', 'Error adding event.');
          console.log(error);
        }
      )

    this.onClearAdd();
  }

  onDelete(){
    if (!this.deleteTitle) {
      this.showToast('warn', 'Warning', 'Please enter the Event title to delete.');
      return;
    }

    console.log("Deletetitle:", this.deleteTitle);
    const eventToDelete = this.event.find(e => e.event_name === this.deleteTitle);
    console.log("Event to delete", eventToDelete);

    this.eventService.deleteEvent(eventToDelete)
      .subscribe(
        (response) => {
          this.showToast('success', 'Success', 'Event deleted successfully.');
          console.log(response);
        },
        (error) => {
          this.showToast('error', 'Error', 'Error deleting event.');
          console.log("Error in adding:",error);
        }
      )
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
    this.date = [];
    this.cover = null;
    this.selectedFileName = "";
  }

  onClearDelete(){
    this.deleteTitle = '';
  }


  onChange(event: any) {
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.selectedFileName = file.name;
      console.log(file);
      this.cover = file;
    }
    console.log("Cover",this.cover);
  }

  //Determines which admin will be edited
  onRowEditInit(event: any): void {

    this.editingEvent= { ...event };
    event.ticketsArray = Array.from({ length: event.max_tickets }, () => "");
  }

  onRowEditSave(event: any): void {

    const index = this.event.findIndex(e => e.title === event.title);

    if (index !== -1) {
      this.event[index] = { ...event };
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
