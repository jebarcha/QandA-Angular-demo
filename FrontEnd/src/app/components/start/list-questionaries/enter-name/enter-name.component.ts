import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerQuestionaryService } from '../../../../services/answer-questionary.service';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.css']
})
export class EnterNameComponent implements OnInit {
  name = '';

  constructor(private router: Router, 
              private answerQuestionaryService: AnswerQuestionaryService) { }

  ngOnInit(): void {
    if (!this.answerQuestionaryService.questionaryId) {
      this.router.navigate(['/start']);
    }
  }

  next() {
    this.answerQuestionaryService.participant = this.name;
    console.log('navigate to question', );
    this.router.navigate(['/start/question']);
  }
}
