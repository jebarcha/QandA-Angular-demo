import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user'
import { LoginService } from '../../../services/login.service';

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
              private router: Router,
              private loginService: LoginService) { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  log() {
    const { username, password} = this.loginForm.value;
    const user: User = {
      username,
      password
    };
  
    this.loading = true;
    this.loginService.login(user).subscribe(data => {
      console.log(data);
      this.loginService.setLocalStorage(data.username);
      this.loading= false;
      this.router.navigate(['/dashboard']);
    }, error => {
      //console.log(error);
      this.loading=false;
      this.loginForm.reset();
      this.toastr.error(error.error.message, 'Error');
    });
    // setTimeout( () => {
    //   if (user.username === 'josebarajas' && user.password === 'admin123') {
    //     this.loginForm.reset();
    //     this.router.navigate(['/dashboard']);
    //   } else {
    //     this.toastr.error('Invalid username or password', 'Error');
    //     this.loginForm.reset();
    //   }
    //   this.loading = false;
    // }, 3000);
  }
}
