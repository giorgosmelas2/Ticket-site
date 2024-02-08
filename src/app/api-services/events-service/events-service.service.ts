import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3500';

  getAllEvents(){
    return this.http.get<any[]>(`${this.apiUrl}/events`);
  }
 
  addEvent(event: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/events`, event);
   
  }

  deleteEvent(event: any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/events/${event.event_name}`);
  }

  updateEvent(updatedEvent: any, eventname: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/events/${eventname}`, updatedEvent);
  }
}


