import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css'
})


export class EventsPageComponent {

  isFullScreen: boolean = true;
  text: string = '';
  date: Date = new Date();
  isPanelOpen =  false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkLayout();
  }

  ngOnInit(): void {
    this.checkLayout();
  }

  private checkLayout(): void {
    this.isFullScreen = window.innerWidth > 768; 
  }

  onUpload(event: any) {
    console.log('File uploaded!', event);
  }
}
