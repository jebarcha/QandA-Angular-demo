import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassword: FormGroup;

  constructor(private fb: FormBuilder) { 
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
    
    console.log(this.changePassword);

  }

}
