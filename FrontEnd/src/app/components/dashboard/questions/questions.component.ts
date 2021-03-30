import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { QuestionaryService } from '../../../services/questionary.service';
import { ToastrService } from 'ngx-toastr';
import { Questionary } from '../../../models/questionary';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  username: string = '';
  listQuestionaries: Questionary[] = [];
  loading: boolean = false;

  constructor(private loginService: LoginService,
              private questionaryService: QuestionaryService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserName();
    this.getQuestionaries();
  }

  getUserName() {
    //console.log(this.loginService.getTokenDecoded());
    //this.username = this.loginService.getUserName();
    this.username = this.loginService.getTokenDecoded().sub;
  }

  getQuestionaries() {
    this.loading = true;
    this.questionaryService.getListQuestionaryByUser().subscribe(questionaries => {
      this.listQuestionaries = questionaries;
      this.loading = false;
      //(questionaries);
    }, error => {
      this.loading = false;
      console.log(error);
      //this.toastr.error('An error occurred', 'Error');
    })
  }

  delete(id: number) {
    if (confirm('Are you sure to delete this questionary?')) {
      this.loading = true;
      this.questionaryService.deleteQuestionary(id).subscribe( response => {
        //console.log(response);
        this.loading = false;
        this.toastr.success('Questionary was deleted!', 'Record deleted');
        this.getQuestionaries();
      }, error => {
        console.log(error);
        this.loading = false;
        this.toastr.error('An error occurred', 'Error');
      });
    }
  }
}
