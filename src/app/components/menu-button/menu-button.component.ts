import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent implements OnChanges{

  @Input() status!:boolean;
  closed!: boolean;
  closing!: boolean;

  constructor(){
    this.status = false;
    this.closed = false;
    this.closing = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['status'].currentValue){
      this.closing = true;
      setTimeout(()=>this.closed = true,150);
    }else{
      this.closed = false;
      setTimeout(()=>this.closing = false,150);
    }
  }

}
