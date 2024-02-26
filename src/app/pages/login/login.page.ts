import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserValidator } from '../../validators/user.validator';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { SamePasswordValidator } from 'src/app/validators/same-password.validator';
import { NewUserValidator } from '../../validators/new-user.validator';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  public submited: boolean;
  public form: FormGroup;
  public isCreate: boolean;
  public showPassword: boolean;
  public cardTitle: string;
  public buttonText: string;
  public linkText: string;
  public loginControlsNames: string[];
  public createControlsNames: string[];
  public loginControls: any;
  public createControls: any;

  constructor(
    private builder: FormBuilder,
    private userValidator: UserValidator,
    private samePasswordValidator: SamePasswordValidator,
    private passwordValidator: PasswordValidator,
    private newUserValidator: NewUserValidator,
    private location: Location,
    private router: Router
  ){
    
    this.isCreate = this.location.path().includes('create');
    this.submited = false;
    this.showPassword = false;
    this.cardTitle = this.isCreate ? $localize `SIGN UP` : $localize `PORTAL`;
    this.buttonText = this.isCreate ? $localize `Sign up` : $localize `Sign in`;
    this.linkText = this.isCreate ? $localize `Already have an account? Sign in here!` : $localize `Don't have an account? Sign up here!`;
    this.loginControlsNames = [$localize `credential`, $localize `password`];
    this.createControlsNames = [$localize `name`, $localize `email`, $localize `phone`, $localize `password`, $localize `confirm password`];
    this.loginControls = {};
    this.loginControls[this.loginControlsNames[0]] = ['', {updateOn:'submit', validators: Validators.required}];
    this.loginControls[this.loginControlsNames[1]] = ['', {updateOn:'submit', validators: Validators.required}];
    this.createControls = {};
    this.createControls[this.createControlsNames[0]] = ['', {updateOn:'submit', validators: Validators.required}];
    this.createControls[this.createControlsNames[1]] = ['', {updateOn:'submit', validators: [Validators.required, Validators.email]}];
    this.createControls[this.createControlsNames[2]] = ['', {updateOn:'submit', validators: Validators.pattern('^[\\+]?[(]?[0-9]{2,3}[)]?[-\\s\\.]?[0-9]{3,}[-\\s\\.]?[0-9]{4,}$')}];
    this.createControls[this.createControlsNames[3]] = ['', {updateOn:'submit', validators: [Validators.required, this.passwordValidator.validate.bind(this.passwordValidator)]}];
    this.createControls[this.createControlsNames[4]] = ['', {updateOn:'submit', validators: Validators.required}];
    this.form = this.loadForm();
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.isCreate = event.url.includes('create');
        this.loadForm();
        this.form.reset();
      }
    });
  }

  loadForm(): FormGroup{
    if(this.isCreate){
      return this.builder.group(this.createControls,
      {
        updateOn: 'submit',
        asyncValidators: this.newUserValidator.validate.bind(this.newUserValidator),
        validators:  this.samePasswordValidator.validate
      });
    }else{
      return this.builder.group(this.loginControls,
      {
        updateOn: 'submit',
        asyncValidators: this.userValidator.validate.bind(this.userValidator)
      });
    }
  }

  keepOrder = () => 0

  getErrorText(errors: ValidationErrors | null): string{
    if(!errors){
      return "no errors.";
    }
    const error = Object.keys(errors)[0];
    return errors[error];
  }

  getControlType(control:string):string {
    if(control.includes('password')){
      if(!this.showPassword){
        return 'password';
      }else{
        return 'text';
      }
    }
    return control;
  }

  getPlaceholder(control:string):string {
    switch(control){
      case 'confirm password': return $localize `Please, confirm your password.`;
      case 'credential': return $localize `Please, insert your email or phone number.`;
      default: return $localize `Please, insert your ${control}.`
    }
  }

}
