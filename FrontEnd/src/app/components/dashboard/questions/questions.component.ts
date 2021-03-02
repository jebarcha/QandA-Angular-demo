import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  username: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName() {
    //console.log(this.loginService.getTokenDecoded());
    //this.username = this.loginService.getUserName();
    this.username = this.loginService.getTokenDecoded().sub;

  }

}
