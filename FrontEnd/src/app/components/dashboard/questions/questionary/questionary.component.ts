import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionaryService } from '../../../../services/questionary.service';

@Component({
  selector: 'app-questionary',
  templateUrl: './questionary.component.html',
  styleUrls: ['./questionary.component.css']
})
export class QuestionaryComponent implements OnInit {
  idQuestionary: number;
  loading: boolean = false;
  questionary: any = {};

  constructor(private questionaryService: QuestionaryService,
              private aRoute: ActivatedRoute) { 
    this.idQuestionary = +this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getQuestionary();
  }

  getQuestionary() {
    this.loading = true;
    this.questionaryService.getQuestionaryById(this.idQuestionary).subscribe(questionary => {
      this.loading = false;
      this.questionary = questionary;
      console.log(questionary);
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

}
