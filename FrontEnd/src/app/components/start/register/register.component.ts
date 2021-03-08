import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService) { 
    this.register = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    }, { validator: this.checkPassword});
  }

  ngOnInit(): void {
  }

  registerUser() {
    this.loading = true;
    //console.log(this.register);

    const user: User = {
      username: this.register.value.username,
      password: this.register.value.password
    }

    this.userService.saveUser(user).subscribe(
      data => {
        //console.log(data)
        this.loading = false; 
        //this.register.reset();
        this.toastr.success(`User ${data.username} has been added successfully!`, 'User Added')
        this.router.navigate(['/inicio/login']);
      }, error => {
        //console.log(error);
        this.loading = false;
        this.toastr.error(error.error.message, 'Error');
        this.register.reset();
      });
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

}
