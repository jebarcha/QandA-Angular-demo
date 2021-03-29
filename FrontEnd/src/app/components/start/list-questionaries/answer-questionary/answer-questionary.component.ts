import { Component, OnInit } from '@angular/core';
import { Questionary } from '../../../../models/questionary';
import { AnswerQuestionaryService } from '../../../../services/answer-questionary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-questionary',
  templateUrl: './answer-questionary.component.html',
  styleUrls: ['./answer-questionary.component.css']
})
export class AnswerQuestionaryComponent implements OnInit {
  questionary: Questionary;
  answerUser: number[] = [];

  constructor(private answerQuestionaryService: AnswerQuestionaryService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.answerQuestionaryService.questionaryId) {
      this.questionary = this.answerQuestionaryService.questionary;
      this.answerUser = this.answerQuestionaryService.answers;
      //console.log(this.questionary);
      //console.log(this.answerUser);
    } else {
      this.router.navigate(['/start']);
    }
  }

}
