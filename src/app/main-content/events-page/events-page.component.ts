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
  ) { }

  isFullScreen: boolean = true;
  isPanelOpen = false;
  isLoading = true;

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

  //Splits the coordinates where ther is ,
  split(input: string) : string{
    var output = '';
    for(let i = 0; i < input.length; i++){
      output += input.charAt(i)
      if (input.charAt(i) == ','){
        output += '\n'
      }
    }
    return output;
  }

  //This method is called when the component initializes
  ngOnInit(): void {
    this.checkLayout();
    this.eventService.getAllEvents()
      .subscribe(
        (data) => {
          this.event = data;
          for (let i = 0; i < this.event.length; i++) {
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

    //Creating a formData to add an event with photo in database.
    const formData = new FormData();
    formData.append('eventName', this.title);
    formData.append('description', this.description);
    formData.append('category', this.selectedCategory);
    formData.append('coordinates', this.coordinates);
    formData.append('ticketPrice', this.price);

    if (this.cover) {
      formData.append('files', this.cover);
    }

    // Append dates and max_tickets to formData with correct format for dates
    this.date.forEach((date, index) => {
      formData.append(`dates[${index}][date]`, date.toISOString());
      formData.append(`dates[${index}][max_tickets]`, this.tickets);
    });

    this.eventService.addEvent(formData)
      .subscribe(
        (response) => {
          this.showToast('success', 'Success', 'Event added successfully.');
          console.log(response);
        },
        (error) => {
          //Checks if fields are filled
          if (error.status == 400) {
            this.showToast('warn', 'Warning', 'Please fill all fields before submitting.');
            console.log(error);
          }

          //Checks for duplicate admin
          if (error.status == 409) {
            this.showToast('error', 'Error', 'This event already exists.');
            console.log("Error in adding:", error);
          }
        }
      )
    this.onClearAdd();
  }

  onDelete() {
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
          console.log("Error in adding:", error);
        }
      )
    this.onClearDelete();
  }

  //Shows only 20 chars in the matrix's cells
  getFirst50Characters(inputString: string): string {
    if (inputString.length <= 12) {
      return inputString;
    } else {
      return inputString.substring(0, 50) + '...';
    }

  }

  //Clears fields in add panel
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

  //Clears field in delete panel
  onClearDelete() {
    this.deleteTitle = '';
  }

  //Saving the photo that user select.
  onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFileName = file.name;
      console.log(file);
      this.cover = file;
    }
  }

  //Makes a copy from the admin object before editing if user discards changes 
  onRowEditInit(event: any): void {
    this.editingEvent = { ...event };
  }

  //Saves changes
  onRowEditSave(event: any): void {

    var updatedEvent;

    //Checkig is the event name is changed. If the name is changed we send it to database. If we send the same name, the changes are not suplied
    if (this.editingEvent.event_name === event.event_name) {
      updatedEvent = {
        description: event.event_description,
        category: event.event_category,
        dates: event.event_dates,
        coordinates: event.event_coordinates,
        ticket_price: parseInt(event.event_ticket_price),
      };
    } else {
      updatedEvent = {
        eventName: event.event_name,
        description: event.event_description,
        category: event.event_category,
        dates: event.event_dates,
        coordinates: event.event_coordinates,
        ticket_price: parseInt(event.event_ticket_price),
      };
    }

    this.eventService.updateEvent(updatedEvent, this.editingEvent.event_name)
      .subscribe(
        (updatedEvent) => {
          this.showToast('success', 'Success', 'Event updated successfully.');
          console.log(updatedEvent);
        },
        (error) => {
          this.showToast('error', 'Error', 'An error has occured.');
          console.error('Error updating event:', error);
        }
      )
  }

  //Discards changes
  onRowEditCancel(): void {

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
