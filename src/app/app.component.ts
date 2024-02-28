import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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
      this.router.navigate(params["redirectTo"]);
    })
  }

}
