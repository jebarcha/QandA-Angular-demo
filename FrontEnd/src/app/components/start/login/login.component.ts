import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router) { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  log() {
    console.log('log-submit', this.loginForm);

    const { username, password} = this.loginForm.value;
    const user: User = {
      username,
      password
    };
  
    this.loading = true;
    setTimeout( () => {
      if (user.username === 'josebarajas' && user.password === 'admin123') {
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.error('Invalid username or password', 'Error');
        this.loginForm.reset();
      }
      this.loading = false;
    }, 3000);

    console.log(user);
  }
}
