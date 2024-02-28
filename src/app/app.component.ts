import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
      const redirectTo = params["redirectTo"];
      if(redirectTo){
        this.router.navigate([redirectTo]);
      }else{
        this.router.navigate(["login"]);
      }
      
    })
  }

}
