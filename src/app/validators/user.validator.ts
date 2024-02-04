import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserValidator implements AsyncValidator {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  async validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> {
    const credential = control.get('credential')?.value;
    const password = control.get('password')?.value;
    const user = await this.userService.login(credential,password);
    return new Promise<ValidationErrors | null>((resolve)=>{
      setTimeout(()=>{
        if(user){
          resolve(null);
          this.router.navigate(['/home']);
        }else{
          resolve({'invalidUser':true});
        }
      },3000);
    });

  }

}
