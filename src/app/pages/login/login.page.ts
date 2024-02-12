import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserValidator } from '../../validators/user.validator';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { SamePasswordValidator } from 'src/app/validators/same-password.validator';
import { NewUserValidator } from 'src/app/validators/new-user.validator';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  public submited: boolean;
  public form: FormGroup;
  public isCreate!: boolean;
  public showPassword!: boolean;

  constructor(
    private builder: FormBuilder,
    private userValidator: UserValidator,
    private samePasswordValidator: SamePasswordValidator,
    private newUserValidator: NewUserValidator,
    private location: Location,
    private router: Router
  ){
    this.isCreate = this.location.path().includes('create');
    this.submited = false;
    this.showPassword = false;
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
      return this.builder.group({
        name: ['', {updateOn:'submit', validators: Validators.required}],
        email: ['', {updateOn:'submit', validators: [Validators.required, Validators.email]}],
        phone: ['', {updateOn:'submit', validators: Validators.pattern('^[\\+]?[(]?[0-9]{2,3}[)]?[-\\s\\.]?[0-9]{3,}[-\\s\\.]?[0-9]{4,}$')}],
        password: ['', {updateOn:'submit', validators: Validators.required}],
        "confirm password": ['', {updateOn:'submit', validators: Validators.required}],
      },{
        updateOn: 'submit',
        asyncValidators: this.newUserValidator.validate.bind(this.newUserValidator),
        validators:  this.samePasswordValidator.validate
      });
    }else{
      return this.builder.group({
        credential: ['', {updateOn:'submit', validators: Validators.required}],
        password: ['', {updateOn:'submit', validators: Validators.required}],
      },{
        updateOn: 'submit',
        asyncValidators: this.userValidator.validate.bind(this.userValidator)
      });
    }
  }

  keepOrder = () => 0

  submit(){
    this.form.markAllAsTouched();
  }

  getErrorText(errors: ValidationErrors | null): string{
    if(!errors){
      return "no errors.";
    }
    const error = Object.keys(errors)[0];
    switch(error){
      case "required": return "This field is mandatory.";
      case 'email': return "Invalid email."
      case 'pattern': return "Invalid phone.";
      case 'passwordMismatch': return "Passwords do not match."
      default: return "no errors."
    }
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
    let placeholder = `Please, insert your ${control}.`
    if(control.includes('confirm')){
      placeholder = "Please, confirm your password."
    }
    return placeholder;
  }

  getLabel(control:string):string{
    return control.charAt(0).toUpperCase() + control.slice(1);
  }

}
