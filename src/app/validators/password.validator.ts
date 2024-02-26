import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidator implements Validator {

  validate(control: AbstractControl<any, any>): ValidationErrors | null{
    let errors = "";
    const lowerCase = /[a-z]+/;
    const upperCase = /[A-Z]+/;
    const numbers = /\d+/;
    const specialChars = /[^"!@#$%¨&*()'`~+=\-_[\]]+/;
    if(!lowerCase.test(control.value)){
      errors += "one lower case letter, ";
    }
    if(!upperCase.test(control.value)){
      errors += "one upper case letter, ";
    }
    if(!numbers.test(control.value)){
      errors += "one number, ";
    }
    if(!specialChars.test(control.value)){
      errors += "one special character, ";
    }
    if(control.value?.length < 8){
      errors += `at least ${8-control.value.length} more characters.`;
    }
    if(!errors){
      return null;
    }
    errors = errors.trim();
    errors = errors.substring(0,errors.length-1) + errors.substring(errors.length-1,errors.length).replace(',','.');
    return {passwordError:"Password is missing " + errors};
  }

}
