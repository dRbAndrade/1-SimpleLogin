import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage {

  constructor(private location: Location) { }

  goBack(){
    this.location.back();
  }

}