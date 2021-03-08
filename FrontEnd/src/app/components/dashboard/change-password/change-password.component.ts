import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassword: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router) { 
    this.changePassword = this.fb.group({
      passwordOld: ['', Validators.required],
      passwordNew: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    }, { validator: this.checkPassword});
  }

  ngOnInit(): void {
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls.passwordNew.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  savePassword() {
    const changePassword: any = {
      PasswordOld: this.changePassword.value.passwordOld,
      PasswordNew: this.changePassword.value.passwordNew
    };
    this.loading = true;
    this.userService.changePassword(changePassword).subscribe(data => {
      //console.log(data);
      this.toastr.success('Password changed successfully!','Password Change');
      this.router.navigate(['/dashboard']);
    }, error => {
      this.loading =false;
      this.changePassword.reset();
      this.toastr.error(error.error.message, 'error')
    });
  }

}
