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
  date: Date[] = [];
  
  description: string = '';
  coordinates: string = '';
  cover: File | null = null;
  tickets: string = '';
  price: string = '';
  selectedCategory: any = '';

  event: any[] = [];
  categories: any[] = [];

  deleteTitle: string = '';
  eventDropdownOptions: any[] = [];

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
          this.isLoading = false;
          console.log(this.event)
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
    //Creating a new variable with correct format from database
    const eventsDatesandTickets = this.date.map(date => ({
      date: date.toISOString(),
      max_tickets: parseInt(this.tickets)
    }));
  
    const newEvent = {
      eventName: this.title,
      description: this.description,
      category: this.selectedCategory,
      dates : eventsDatesandTickets,
      coordinates: this.coordinates,
      ticketPrice: parseInt(this.price), 
      files: this.cover
    };

    this.eventService.addEvent(newEvent)
      .subscribe(
        (response) => {
          this.showToast('success', 'Success', 'Event added successfully.');
          console.log(response);
        },
        (error) => {
          //Checks if fields are filled
          if(error.status == 400){
            this.showToast('warn', 'Warning', 'Please fill all fields before submitting.');
            console.log(error);
          }

          //Checks for duplicate admin
          if(error.status == 409){
            this.showToast('error', 'Error', 'This event already exists.');
            console.log("Error in adding:",error);
          }
        }
      )

    this.onClearAdd();
  }

  onDelete(){
    if (!this.deleteTitle) {
      this.showToast('warn', 'Warning', 'Please enter the Event title to delete.');
      return;
    }

    //Finds the event by maching the choosen title with title from event array
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
  getFirst20Characters(inputString: string): string {
    if (inputString.length <= 12) {
      return inputString;
    } else {
      return inputString.substring(0, 20) + '...';
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

  //Makes a copy from the admin object before editing if user discards changes 
  onRowEditInit(event: any): void {
    this.editingEvent= { ...event };
  }

  onRowEditSave(event: any): void {

    console.log("Event for edit", event);

    console.log("Event date",event.dates);

    var updatedEvent;

   
    //Checkig is the email is changed. If the email is changed we send it to database. If we send the same email the changes are not suplied
    if(this.editingEvent.event_name === event.event_name){
      updatedEvent = {
        description: event.event_description,
        category: event.event_category,
        dates : event.event_dates,
        coordinates: event.event_coordinates,
        ticketPrice: parseInt(event.event_ticket_price), 
      }; 
    }else{
      updatedEvent = {
        eventName: event.event_name,
        description: event.event_description,
        category: event.event_category,
        dates : event.event_dates,
        coordinates: event.event_coordinates,
        ticketPrice: parseInt(event.event_ticket_price), 
      };  
    }

    console.log("Updated Event", updatedEvent);
    this.eventService.updateEvent(event)
      .subscribe(
        (updatedEvent) => {
          this.showToast('success', 'Success', 'Event updated successfully.');
          console.log(updatedEvent);
        },
        (error) => {
          this.showToast('error', 'Error', 'An error has occured.');
          console.error('Error updating admin:', error);
        }
      )
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
