import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private localStorageKeyCategories = 'categories_entries';
  private localStorageKeyUserEmails = 'user_emails';
  private localStorageKeyLogin = 'login';


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



}
