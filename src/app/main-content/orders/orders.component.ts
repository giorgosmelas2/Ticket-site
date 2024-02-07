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

  deleteOrderId: string ='';
  orderDropdownOptions: any[] =[];

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
          for( let i = 0; i<this.order.length; i++){
            this.orderDropdownOptions[i] = this.order[i].orderId; 
          }
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

  onDelete(): void {    
    if (!this.deleteOrderId) {
      this.showToast('warn', 'Warning', 'Please select an order Id.');
      return;
    }

    //Finds the user by maching the choosen email with emails from admin array
    const orderToDelete = this.order.find(o => o.orderId === this.deleteOrderId);
    this.orderService.deleteOrder(orderToDelete)
      .subscribe(
        (response) => {
          this.showToast('success', 'Success', 'Order deleted successfully.');
          console.log(response);
        },
        (error) => {
          this.showToast('error', 'Error', 'Error deleting order.');
          console.log("Error in deleting:",error);
        }
      )
  }

  //Clears field in delete panel
  onClearDelete(){
    this.deleteOrderId = '';
  }

}
