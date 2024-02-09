import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private localStorageKeyCategories = 'categories_entries';

  //Saves categories to local storage
  setCategories(data: any[]): void {
    localStorage.setItem(this.localStorageKeyCategories, JSON.stringify(data));
  }

  //Returns categories from logal storage
  getCategories(): any[] {
    const storedEntries = localStorage.getItem(this.localStorageKeyCategories);
    return storedEntries ? JSON.parse(storedEntries) : [];
  }
}
