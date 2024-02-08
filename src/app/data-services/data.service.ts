import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private localStorageKeyCategories = 'categories_entries';

  setCategories(data: any[]): void {
    localStorage.setItem(this.localStorageKeyCategories, JSON.stringify(data));
  }

  getCategories(): any[] {
    const storedEntries = localStorage.getItem(this.localStorageKeyCategories);
    return storedEntries ? JSON.parse(storedEntries) : [];
  }
}
