import { Component, OnInit } from '@angular/core';
import { AnswerQuestionaryService } from '../../../../services/answer-questionary.service';
import { QuestionaryService } from '../../../../services/questionary.service';
import { Router } from '@angular/router';
import { Question } from '../../../../models/question';
import { AnswerQuestionaryDetail } from '../../../../models/answerQuestionaryDetail';
import { AnswerQuestionary } from '../../../../models/answerQuestionary';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionaryId: number;
  listQuestions: Question[] = [];
  loading = false;
  confirm = false;
  optionSelected: any;
  index = 0;
  idAnswerSelected: number;

  listAnswerDetail: AnswerQuestionaryDetail[] = [];

  constructor(private answerQuestionaryService: AnswerQuestionaryService,
              private questionaryService: QuestionaryService,
              private router: Router) { }

  ngOnInit(): void {
    this.questionaryId = this.answerQuestionaryService.questionaryId;
    if (!this.questionaryId) {
      this.router.navigate(['/start']);
    }
    this.getQuestionary();
    this.answerQuestionaryService.answers = [];
  }

  getQuestionary() {
    this.loading = true;
    this.questionaryService.getQuestionaryById(this.questionaryId).subscribe(data => {
      //console.log(data);
      this.listQuestions = data.listQuestions;
      this.loading = false;
      this.answerQuestionaryService.questionary = data;
    });
  }

  getQuestion(): string {
    if (this.index >= this.listQuestions.length) return;
    //console.log('index is', this.index);
    //console.log('to check issue with description', this.listQuestions);
    const questionOf = `${this.index+1}/${this.listQuestions.length}`;
    return `(${questionOf}) ${this.listQuestions[this.index].description}`;
  }

  getIndex(): number {
    return this.index;
  }

  answerSelected(answer: any): void {
    this.optionSelected = answer;
    this.confirm = true;
    this.idAnswerSelected = answer.id;
  }

  AddClassOption(answer: any): string {
    if (answer === this.optionSelected) {
      return 'active text-light';
    }
  }
  
  next() {
    //console.log('step 1');
    this.answerQuestionaryService.answers.push(this.idAnswerSelected);
    //console.log(this.answerQuestionaryService.answers);

    //console.log('step 2');
    // Create object AnswerDetail
    const answerDetail: AnswerQuestionaryDetail = {
      answerId: this.idAnswerSelected
    };

    //console.log('step 3');
    // Add object to the array
    this.listAnswerDetail.push(answerDetail);

    //console.log('step 4');
    this.confirm = false;
    this.index++;
    this.idAnswerSelected = null;

    if (this.index == this.listQuestions.length) {
      //console.log('step 5');
      this.saveAnswerQuestionary();
      //console.log('fin del next')
   }
  }

  saveAnswerQuestionary() {
    const ansQuestionary: AnswerQuestionary = {
      questionaryId: this.answerQuestionaryService.questionaryId,
      participant: this.answerQuestionaryService.participant,
      listAnsQuestionaryDetail: this.listAnswerDetail
    };

    //console.log('ansQuestionary', ansQuestionary);

    this.loading = true;
    this.answerQuestionaryService.saveAnswerQuestionary(ansQuestionary).subscribe(data => {
      //console.log(data);
      this.loading = false;
      this.router.navigate(['/start/answerquestionary']);
    }, error => {
      this.loading = false;
      console.log(error);
    });

    //console.log('fin del saveAnswerQuestionary')
  }
}
