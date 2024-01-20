import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {}

  getAllUsers(){
    return this.http.get<any[]>('http://localhost:3500/users');
  }
}
