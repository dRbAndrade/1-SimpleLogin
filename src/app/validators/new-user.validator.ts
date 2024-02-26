import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewUserValidator implements AsyncValidator {

  constructor(
    private userService: UserService,
    private router : Router
  ) { }

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    const email = control.get('email')?.value;
    const password = control.get('password')?.value;
    const phone = control.get('phone')?.value;
    const name = control.get('name')?.value;
    return new Observable(obs=>{
      this.userService.createUser(name,phone,email,password)
        .pipe(catchError((err)=>of({'dbError':err})))
        .subscribe(()=>{
          obs.next(null);
          obs.complete();
          this.router.navigate(['/','login']);
        });
    })
  }

}
