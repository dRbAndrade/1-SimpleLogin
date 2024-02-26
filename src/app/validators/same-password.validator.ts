import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SamePasswordValidator implements Validator {

  validate(control: AbstractControl<any, any>): ValidationErrors | null{
    const password = control.get('password');
    const confirm = control.get('confirm password');
    const error = {'passwordMismatch':"Passwords do not match."};
    if(password?.pristine || !password?.dirty || 
       confirm?.pristine || !confirm?.dirty || 
       !password.value || !confirm.value ||
       password.value===confirm.value){
        if(confirm?.errors){
          delete confirm.errors['passwordMismatch'];
          if(Object.keys(confirm.errors).length===0){
            confirm.setErrors(null);
          }
        }
        if(password?.errors){
          delete password.errors['passwordMismatch'];
          if(Object.keys(password.errors).length===0){
            password.setErrors(null);
          }
        }
      return null;
    }else{
      confirm.setErrors({...confirm.errors,...error});
      password.setErrors({...password.errors,...error});
      return error;
    }

  }

}
