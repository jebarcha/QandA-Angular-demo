import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Questionary } from '../models/questionary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionaryService {
  titleQuestionary: string;
  descriptionQuestionary: string;
  myAppUrl: string = '';
  myApiUrl: string = '';

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/questionary';
  }

  saveQuestionary(questionary: Questionary): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, questionary);
  }

}
