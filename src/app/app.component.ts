import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{

  constructor(
    private router: Router,
    private route: ActivatedRoute){
    this.route.queryParams.subscribe(params=>{
      if(environment.production){
        const redirectTo = params["redirectTo"];
        console.log(18,redirectTo);
        console.log(19,params);
        console.log(20,this.route);
        if(redirectTo){
          this.router.navigate([redirectTo]);
        }else{
          // this.router.navigate(["login"]);
        }
      }
    })
  }

}
