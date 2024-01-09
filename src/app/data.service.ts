import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private localStorageKey = 'categories_entries';
  private localStorageKeyCategories = 'categories';


  getEntries(): any[] {
    const storedEntries = localStorage.getItem(this.localStorageKey);
    return storedEntries ? JSON.parse(storedEntries) : [];
  }

  setEntries(data: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }



}
