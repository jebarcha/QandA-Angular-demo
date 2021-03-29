import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerQuestionaryService } from '../../../../../services/answer-questionary.service';
import { Questionary } from '../../../../../models/questionary';
import { AnswerQuestionaryDetail } from '../../../../../models/answerQuestionaryDetail';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.css']
})
export class AnswerDetailComponent implements OnInit {
  answerId: number;
  loading: boolean = false;
  questionary: Questionary;
  answers: AnswerQuestionaryDetail[] = [];

  constructor(private aRoute: ActivatedRoute,
              private answerQuestionaryService: AnswerQuestionaryService) { 
    this.answerId = +this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getListAnswersAndQuestionary();
  }

  getListAnswersAndQuestionary() {
    this.loading = true;
    this.answerQuestionaryService.getQuestionaryByAnswerId(this.answerId).subscribe( data => {
      //console.log(data);
      this.loading = false;
      this.questionary = data['questionary'];
      this.answers = data['answers'];
      //console.log(this.questionary);
      //console.log(this.answers);
    })
  }

}
