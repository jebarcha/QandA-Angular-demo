import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

// Interceptors
import { AddTokenInterceptor } from '../app/helpers/add-token.interceptor'

// Components
import { AppComponent } from './app.component';
import { StartComponent } from './components/start/start.component';
import { WelcomeComponent } from './components/start/welcome/welcome.component';
import { LoginComponent } from './components/start/login/login.component';
import { RegisterComponent } from './components/start/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChangePasswordComponent } from './components/dashboard/change-password/change-password.component';
import { QuestionsComponent } from './components/dashboard/questions/questions.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { NewQuestionaryComponent } from './components/dashboard/questions/new-questionary/new-questionary.component';
import { Step1Component } from './components/dashboard/questions/new-questionary/step1/step1.component';
import { Step2Component } from './components/dashboard/questions/new-questionary/step2/step2.component';
import { NewQuestionComponent } from './components/dashboard/questions/new-questionary/step2/new-question/new-question.component';
import { QuestionaryComponent } from './components/dashboard/questions/questionary/questionary.component';
import { ListQuestionariesComponent } from './components/start/list-questionaries/list-questionaries.component';
import { EnterNameComponent } from './components/start/list-questionaries/enter-name/enter-name.component';
import { QuestionComponent } from './components/start/list-questionaries/question/question.component';
import { AnswerQuestionaryComponent } from './components/start/list-questionaries/answer-questionary/answer-questionary.component';
import { StatisticsComponent } from './components/dashboard/questions/statistics/statistics.component';
import { AnswerDetailComponent } from './components/dashboard/questions/statistics/answer-detail/answer-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ChangePasswordComponent,
    QuestionsComponent,
    NavbarComponent,
    LoadingComponent,
    NewQuestionaryComponent,
    Step1Component,
    Step2Component,
    NewQuestionComponent,
    QuestionaryComponent,
    ListQuestionariesComponent,
    EnterNameComponent,
    QuestionComponent,
    AnswerQuestionaryComponent,
    StatisticsComponent,
    AnswerDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
