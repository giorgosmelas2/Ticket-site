import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private localStorageKeyCategories = 'categories_entries';
  private localStorageKeyAdmins = 'admins_add';
  private localStorageKeyUsers = 'users_add';
  private localStorageKeyEvens = 'events'



  getEntries(): any[] {
    const storedEntries = localStorage.getItem(this.localStorageKeyCategories);
    return storedEntries ? JSON.parse(storedEntries) : [];
  }

  setEntries(data: any[]): void {
    localStorage.setItem(this.localStorageKeyCategories, JSON.stringify(data));
  }

  getAdmins(): any[]{
    const storedAdmins = localStorage.getItem(this.localStorageKeyAdmins);
    return storedAdmins ? JSON.parse(storedAdmins) : [];
  }

  setAdmins(data: any[]): void{
    localStorage.setItem(this.localStorageKeyAdmins, JSON.stringify(data));
  }

  getUsers(): any[]{
    const storedUsers = localStorage.getItem(this.localStorageKeyUsers);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }
  
  setUsers(data: any[]): void{
    localStorage.setItem(this.localStorageKeyUsers, JSON.stringify(data));
  }

  getEvents(): any[]{
    const storedEvents = localStorage.getItem(this.localStorageKeyEvens);
    return storedEvents ? JSON.parse(storedEvents) : [];
  }

  setEvents(data: any[]): void{
    localStorage.setItem(this.localStorageKeyEvens, JSON.stringify(data));
  }
  


}
