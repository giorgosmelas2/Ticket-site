import { Component } from '@angular/core';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  text: string = '';
  isPanelOpen =  false;
  isFullScreen: boolean = true;

    
  statuses: { label: string, value: any }[] = [
    { label: 'Option 1', value: 'value1' },
    { label: 'Option 2', value: 'value2' },
  ];

  rangeDates: any;
  products: any[] = [
    // Your product data goes here
  ];
  value: number = 1;

  //Οι τρεις μεθοδοι χρησιμοποιουνται οταν απο full screen κανω την οθονη μικροτερη για να αλλαξουν το layout
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

  // Η μεθοδος αυτη θα ανεβαζει την φωτο που διαλεξαμε
  onUpload(event: any) {
    console.log('File uploaded!', event);
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
