import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListQuestionariesRoutingModule } from './list-questionaries-routing.module';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { EnterNameComponent } from './enter-name/enter-name.component';
import { QuestionComponent } from './question/question.component';
import { AnswerQuestionaryComponent } from './answer-questionary/answer-questionary.component';

@NgModule({
  declarations: [
    EnterNameComponent,
    QuestionComponent,
    AnswerQuestionaryComponent,
  ],
  imports: [
    CommonModule,
    ListQuestionariesRoutingModule,
    SharedModule
  ]
})
export class ListQuestionariesModule { }
