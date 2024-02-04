import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'incidents',
  templateUrl: './incidents.page.html',
  styleUrls: ['./incidents.page.scss'],
})
export class IncidentsPage {

  constructor(private location: Location) { }

  goBack(){
    this.location.back();
  }

}
