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
  date: any;
  
  description: string = '';
  coordinates: string = '';
  cover: File | null = null;
  tickets: string = '';
  price: string = '';
  selectedCategory: any = '';

  event: any[] = [];

  //The categories that are avauliabe in categories page
  categories: any[] = [];

  deleteEmail: string = '';
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
      !this.date ||
      !this.cover
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
      event_name: this.title,
      event_description: this.description,
      event_category: this.selectedCategory,
      event_dates : {
        date: this.date,
        max_tickets: this.tickets
      } ,
      event_coordinates: this.coordinates,
      event_ticket_price: this.price, 
      event_images: this.cover
    };

    this.eventService.addEvent(newEvent)
      .subscribe(
        (response) => {
          this.showToast('success', 'Success', 'Admin added successfully.');
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
    if (!this.deleteEmail) {
      this.showToast('warn', 'Warning', 'Please enter the Event title to delete.');
      return;
    }

    const index = this.event.findIndex(e => e.title === this.deleteEmail);

    if (index !== -1) {
      this.event.splice(index, 1);
      this.dataService.setEvents(this.event);
      this.deleteEmail = '';
    } else {
      alert('Admin not found with the specified ID.');
    }

    this.onClearDelete();
  }

  getDates(event: any): string{
    var dates = event.event_dates[0];
    if(event.event_dates.length > 1){    
      for(let i = 1; i<event.event_dates.length; i++){
        dates += dates  + event.event_dates[i]
      }
    }
    console.log("dates",dates);
    return dates;
    
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
    this.cover = null;
    this.selectedFileName = "";
  }

  onClearDelete(){
    this.deleteEmail = '';
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
