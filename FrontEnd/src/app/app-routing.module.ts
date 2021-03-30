import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './components/start/welcome/welcome.component';
import { RegisterComponent } from './components/start/register/register.component';
import { LoginComponent } from './components/start/login/login.component';
import { StartComponent } from './components/start/start.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListQuestionariesComponent } from './components/start/list-questionaries/list-questionaries.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full'},
  { path: 'start', component: StartComponent, children: [
    { path: '', component: WelcomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'listQuestionaries', 
      component: ListQuestionariesComponent, 
      loadChildren: () => import('./components/start/list-questionaries/list-questionaries.module')
        .then(x => x.ListQuestionariesModule)},
  ]},
  { path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/dashboard/dashboard.module')
      .then(x => x.DashboardModule)
  },
  { path: '**', redirectTo: '/start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
