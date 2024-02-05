import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3500';

  getAllOrders(){
    return this.http.get<any[]>(`${this.apiUrl}/order`);
  }
}
