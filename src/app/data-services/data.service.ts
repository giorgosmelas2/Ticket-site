import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private localStorageKeyCategories = 'categories_entries';
  private localStorageKeyEvens = 'events'
  private localStorageKeyUserEmails = 'user_emails'


  setCategories(data: any[]): void {

    localStorage.setItem(this.localStorageKeyCategories, JSON.stringify(data));
  }

  getCategories(): any[] {
    const storedEntries = localStorage.getItem(this.localStorageKeyCategories);
    return storedEntries ? JSON.parse(storedEntries) : [];
  }

  setUserEmails(data: any[]): void {
    localStorage.setItem(this.localStorageKeyUserEmails, JSON.stringify(data));
  }

  getUserEmails(): any[] {
    const storedUserEmails = localStorage.getItem(this.localStorageKeyUserEmails);
    return storedUserEmails ? JSON.parse(storedUserEmails) : []
  }

  getEvents(): any[]{
    const storedEvents = localStorage.getItem(this.localStorageKeyEvens);
    return storedEvents ? JSON.parse(storedEvents) : [];
  }

  setEvents(data: any[]): void{
    localStorage.setItem(this.localStorageKeyEvens, JSON.stringify(data));
  }

  clearCategories(): void {
    localStorage.removeItem(this.localStorageKeyCategories);
  }

}
