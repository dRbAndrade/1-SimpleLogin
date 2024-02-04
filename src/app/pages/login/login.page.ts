import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserValidator } from '../../validators/user.validator';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  public submited: boolean;
  public loginForm: FormGroup;

  constructor(
      private builder: FormBuilder,
      private userValidator: UserValidator
    ){
    this.submited = false;
    this.loginForm = this.builder.group({
      credential: ['', {updateOn:'submit', validators: Validators.required}],
      password: ['', {updateOn:'submit', validators: Validators.required}],
    },{
      updateOn: 'submit',
      asyncValidators: this.userValidator.validate.bind(this.userValidator)
    });
  }

  get credential(){
    return this.loginForm.get('credential');
  }

  get password(){
    return this.loginForm.get('password');
  }

  get token(){
    return this.loginForm.get('token');
  }

  submit(){
    this.loginForm.markAllAsTouched();
  }

}
