import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/user';
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  changePassword(changePassword): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/ChangePassword`, changePassword);
  }
}
