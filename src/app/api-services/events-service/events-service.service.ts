import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {

  constructor(private http: HttpClient) { }

  getAllEvents(){
    return this.http.get<any[]>('http://localhost:3500/events');
  }
}
