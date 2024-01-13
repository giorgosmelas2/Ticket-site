import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private localStorageKeyCategories = 'categories_entries';
  private localStoragekeyAdmins = 'admins_add'




  getEntries(): any[] {
    const storedEntries = localStorage.getItem(this.localStorageKeyCategories);
    return storedEntries ? JSON.parse(storedEntries) : [];
  }

  setEntries(data: any[]): void {
    localStorage.setItem(this.localStorageKeyCategories, JSON.stringify(data));
  }

  setAdmins(data: any[]): void{
    localStorage.setItem(this.localStoragekeyAdmins, JSON.stringify(data));
  }

  getAdmins(): any[]{
    const storedAdmins = localStorage.getItem(this.localStoragekeyAdmins);
    return storedAdmins ? JSON.parse(storedAdmins) : [];
  }
}
