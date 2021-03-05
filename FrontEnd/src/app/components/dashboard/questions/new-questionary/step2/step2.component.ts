import { Component, OnInit } from '@angular/core';
import { QuestionaryService } from 'src/app/services/questionary.service';
import { Question } from '../../../../../models/question';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Questionary } from '../../../../../models/questionary';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  titleQuestionary: string;
  descriptionQuestionary: string;
  listQuestions: Question[] = [];
  loading: boolean = false;

  constructor(private questionaryService: QuestionaryService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.titleQuestionary = this.questionaryService.titleQuestionary;
    this.descriptionQuestionary = this.questionaryService.descriptionQuestionary;
    console.log(this.questionaryService.titleQuestionary, this.questionaryService.descriptionQuestionary);
  }

  saveQuestion(question: Question) {
      this.listQuestions.push(question);
      console.log(this.listQuestions);
  }

  removeQuestion(index: number) {
    this.listQuestions.splice(index, 1);
  }

  saveQuestionary() {
    this.loading = true;
    
    const questionary: Questionary = {
      name: this.titleQuestionary,
      description: this.descriptionQuestionary,
      listQuestions: this.listQuestions
    };

    console.log(questionary);

    this.questionaryService.saveQuestionary(questionary).subscribe(data => {
      this.toastr.success('Questionary was saved successfully', 'Questionary Saved');
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
      this.toastr.error('An error occurred!', 'Error');
      this.router.navigate(['/dashboard']);
    });
  }

}
