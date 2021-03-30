import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { QuestionsComponent } from './questions/questions.component';
import { AnswerDetailComponent } from './questions/statistics/answer-detail/answer-detail.component';
import { StatisticsComponent } from './questions/statistics/statistics.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { QuestionaryComponent } from './questions/questionary/questionary.component';
import { NewQuestionaryComponent } from './questions/new-questionary/new-questionary.component';
import { Step1Component } from './questions/new-questionary/step1/step1.component';
import { Step2Component } from './questions/new-questionary/step2/step2.component';

const routes: Routes = [
  { path: '', component: QuestionsComponent},
  { path: 'changePassword', component: ChangePasswordComponent},
  { path: 'seeQuestionary/:id', component: QuestionaryComponent},
  { path: 'statistics/:id', component: StatisticsComponent},
  { path: 'answerDetail/:id', component: AnswerDetailComponent},
  { path: 'newQuestionary', 
    component: NewQuestionaryComponent, 
    children: [
      { path: 'step1', component: Step1Component },
      { path: 'step2', component: Step2Component }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
