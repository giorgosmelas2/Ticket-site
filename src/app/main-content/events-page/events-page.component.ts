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
  text: string = '';
  selectedCategory: any = '';
  categories: any[] = [];
  event: any[] = [];
  value: number = 1;
  
  statuses: { label: string, value: any }[] = [
    { label: 'Option 1', value: 'value1' },
    { label: 'Option 2', value: 'value2' },
  ];

 //Checks for fullscreen or halfscreen  @HostListener('window:resize', ['$event'])
 @HostListener('window:resize', ['$event']) 
 onResize(event: Event): void {
    this.checkLayout();
  }
  
 //Checks for fullscreen or halfscreen
  ngOnInit(): void {
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
