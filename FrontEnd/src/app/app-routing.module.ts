import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './components/start/welcome/welcome.component';
import { RegisterComponent } from './components/start/register/register.component';
import { LoginComponent } from './components/start/login/login.component';
import { StartComponent } from './components/start/start.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionsComponent } from './components/dashboard/questions/questions.component';
import { ChangePasswordComponent } from './components/dashboard/change-password/change-password.component';
import { NewQuestionaryComponent } from './components/dashboard/questions/new-questionary/new-questionary.component';
import { Step1Component } from './components/dashboard/questions/new-questionary/step1/step1.component';
import { Step2Component } from './components/dashboard/questions/new-questionary/step2/step2.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full'},
  { path: 'start', component: StartComponent, children: [
    { path: '', component: WelcomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
  ]},
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', component: QuestionsComponent},
    { path: 'changePassword', component: ChangePasswordComponent},
    { path: 'newQuestionary', 
      component: NewQuestionaryComponent, 
      children: [
        { path: 'step1', component: Step1Component },
        { path: 'step2', component: Step2Component }
      ]
    }
  ]},
  { path: '**', redirectTo: '/start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
