import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { EnterNameComponent } from './enter-name/enter-name.component';
import { QuestionComponent } from './question/question.component';
import { AnswerQuestionaryComponent } from './answer-questionary/answer-questionary.component';

const routes: Routes = [
  { path: 'enterName', component: EnterNameComponent},
  { path: 'question', component: QuestionComponent},
  { path: 'answerquestionary', component: AnswerQuestionaryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListQuestionariesRoutingModule { }
