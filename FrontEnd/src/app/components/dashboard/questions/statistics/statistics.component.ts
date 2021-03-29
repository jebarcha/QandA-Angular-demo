import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerQuestionaryService } from '../../../../services/answer-questionary.service';
import { AnswerQuestionary } from '../../../../models/answerQuestionary';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  questionaryId: number;
  loading: boolean = false;
  listAnswerQuestionary: AnswerQuestionary[] = [];

  constructor(private aRoute: ActivatedRoute,
              private answerQuestionaryService: AnswerQuestionaryService,
              private toastr: ToastrService) { 
      this.questionaryId = +this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getListQuestionary();
  }

  getListQuestionary() {
    this.loading = true;
    this.answerQuestionaryService.getListAnswerQuestionary(this.questionaryId).subscribe(data => {
      //console.log(data);
      this.loading = false;
      this.listAnswerQuestionary = data;
    });
  }

  deleteAnswerQuestionary(answerQuestionaryId: number) {
    this.loading = true;
    this.answerQuestionaryService.deleteAnswerQuestionary(answerQuestionaryId).subscribe( (resp) => {
      //console.log(resp);
      this.loading = false;
      this.toastr.error('Answer was deleted succesfully', 'Record deleted');
      this.getListQuestionary();
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error('There was an error when deleting', 'Error');
    });
  }

}
