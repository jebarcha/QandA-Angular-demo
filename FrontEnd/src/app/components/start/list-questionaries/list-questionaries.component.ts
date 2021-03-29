import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionaryService } from '../../../services/questionary.service';
import { Questionary } from '../../../models/questionary';
import { AnswerQuestionaryService } from '../../../services/answer-questionary.service';

@Component({
  selector: 'app-list-questionaries',
  templateUrl: './list-questionaries.component.html',
  styleUrls: ['./list-questionaries.component.css']
})
export class ListQuestionariesComponent implements OnInit {
  loading: boolean = false;
  listQuestionaries: Questionary[] = [];

  constructor(private questionaryService: QuestionaryService,
              private router: Router,
              private answerQuestionaryService: AnswerQuestionaryService) { }

  ngOnInit(): void {
    this.getListQuestionaries();
  }

  getListQuestionaries() {
    this.loading = true;
    this.questionaryService.getListQuestionaries().subscribe(data => {
      //console.log(data);
      this.listQuestionaries = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  enterName(questionaryId: number) {
    //console.log(questionaryId);
    this.answerQuestionaryService.questionaryId = questionaryId;
    this.router.navigate(['/start/enterName']);
  }

}
