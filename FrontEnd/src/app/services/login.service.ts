import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/login';
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  setLocalStorage(data) {
    localStorage.setItem('username', data);
  }

  getUserName(): string {
    return localStorage.getItem('username');
  }

  removeUserName() {
    localStorage.removeItem('username');
  }
}
