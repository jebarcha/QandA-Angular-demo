import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Questionary } from '../models/questionary';
import { AnswerQuestionary } from '../models/answerQuestionary';

@Injectable({
  providedIn: 'root'
})
export class AnswerQuestionaryService {
  myAppUrl: string;
  myApiUrl: string;

  participant: string;
  questionaryId: number;
  answers: number[] = [];
  questionary: Questionary;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/answerQuestionary/';
  }

  saveAnswerQuestionary(answerQuestionary: AnswerQuestionary): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, answerQuestionary);
  }

  getListAnswerQuestionary(questionaryId: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${questionaryId}`);
  }

  deleteAnswerQuestionary(answerQuestionaryId: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${answerQuestionaryId}`);
  }
  getQuestionaryByAnswerId(answerId: number) {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}GetQuestionaryByAnswerId/${answerId}`);
  }
}
