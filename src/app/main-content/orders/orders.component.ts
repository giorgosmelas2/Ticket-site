import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OrderServiceService } from '../../api-services/order-service/order-service.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  constructor( 
    private messageService: MessageService,
    private orderService: OrderServiceService
    ){}

  isFullScreen: boolean = true;
  isPanelOpen =  false;
  isLoading = true; 

  order: any[] = [];

  deleteOrder: string ='';

  //Method for toast messages
  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, key: 'bottomCenter' });
  }

  ngOnInit():void {
    this.checkLayout();
    this.orderService.getAllOrders()
      .subscribe(
        (data) => {
          this.order = data;
          this.isLoading = false;
          console.log(this.order)
        },
        (error) => {
          this.showToast('error', 'Error', 'Error loading orders.');
          console.log(error);
          this.isLoading = false;
        }
      )
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
