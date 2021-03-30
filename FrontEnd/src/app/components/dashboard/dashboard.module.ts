import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

// Components
import { ChangePasswordComponent } from './change-password/change-password.component';
import { QuestionsComponent } from './questions/questions.component';
import { NewQuestionaryComponent } from './questions/new-questionary/new-questionary.component';
import { Step1Component } from './questions/new-questionary/step1/step1.component';
import { Step2Component } from './questions/new-questionary/step2/step2.component';
import { NewQuestionComponent } from './questions/new-questionary/step2/new-question/new-question.component';
import { QuestionaryComponent } from './questions/questionary/questionary.component';
import { StatisticsComponent } from './questions/statistics/statistics.component';
import { AnswerDetailComponent } from './questions/statistics/answer-detail/answer-detail.component';

@NgModule({
  declarations: [
    ChangePasswordComponent,
    QuestionsComponent,
    NewQuestionaryComponent,
    Step1Component,
    Step2Component,
    NewQuestionComponent,
    QuestionaryComponent,
    StatisticsComponent,
    AnswerDetailComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class DashboardModule { }
