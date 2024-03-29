import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserValidator implements AsyncValidator {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    const credential = control.get('credential')?.value;
    const password = control.get('password')?.value;
    return new Observable(obs=>{
      this.userService.login(credential,password)
        .pipe(catchError(err=>of(err)))
        .subscribe((response)=>{
          if(!response){
            obs.next(null);
            this.router.navigate(['/home']);
          }else{
            obs.next({dbError:response.message});
          }
          obs.complete();
      });
    });
  }
  
}
