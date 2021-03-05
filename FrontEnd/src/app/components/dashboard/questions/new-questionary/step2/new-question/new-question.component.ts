import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Question } from '../../../../../../models/question';
import { ToastrService } from 'ngx-toastr';
import { Answer } from 'src/app/models/answer';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  newQuestion: FormGroup;
  question: Question;
  AnsCorrect = 0;
  @Output() sendQuestion = new EventEmitter<Question>();

  constructor(private fb: FormBuilder,
              private toastr: ToastrService) { 
    this.newQuestion = this.fb.group(
      {
        title: ['', Validators.required],
        answers: this.fb.array([])
      });        
  }

  ngOnInit(): void {
    this.addDefaultAnswers();
  }

  addDefaultAnswers() {
    this.addAnswer();
    this.addAnswer();
  }

  // return FormArray of answers
  get getAnswers(): FormArray {
    return this.newQuestion.get('answers') as FormArray;
  }

  //Add answer to the array
  addAnswer() {
    this.getAnswers.push(this.fb.group({
      description: ['', Validators.required],
      isCorrect: 0
    }));
  }

  removeAnswer(index: number) {
    if(this.getAnswers.length===2) {
      this.toastr.error('The question must contain at least 2 answers', 'Error');
    } else {
      this.getAnswers.removeAt(index);
    }
  }

  setValidAnswer(index: number) {
    this.AnsCorrect = index;
  }

  addQuestion() {
    // get title of the question
    const QuestionDescription = this.newQuestion.get('title').value;

    // get array of answers
    const arrAnswers = this.newQuestion.get('answers').value;

    // Create an array of answers
    const arrayAns: Answer[] = [];

    arrAnswers.forEach(element => {
      const answer: Answer = new Answer(element.description, false);

      arrayAns.push(answer);
    });

    arrayAns[this.AnsCorrect].isCorrect = true;

    const question: Question = new Question(QuestionDescription, arrayAns);

    //console.log(question);
    this.sendQuestion.emit(question);
    this.reset();
  }

  reset() {
    this.newQuestion.reset();
    this.getAnswers.clear();
    this.addDefaultAnswers();
  }
}
