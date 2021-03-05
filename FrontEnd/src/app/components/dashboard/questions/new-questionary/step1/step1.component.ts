import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionaryService } from '../../../../../services/questionary.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  dataQuestionary: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private questionaryService: QuestionaryService) { 
    this.dataQuestionary = this.fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required]
      });
  }

  ngOnInit(): void {
  }

  stepOne() {
    console.log(this.dataQuestionary);
    this.questionaryService.titleQuestionary = this.dataQuestionary.value.title;
    this.questionaryService.descriptionQuestionary = this.dataQuestionary.value.description;
    this.router.navigate(['/dashboard/newQuestionary/step2']);
  }
}
