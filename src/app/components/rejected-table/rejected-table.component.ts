import { Component, Input, OnChanges } from '@angular/core';
import { SunatErrors } from 'src/app/types/rejected';

@Component({
  selector: 'rejected-table',
  templateUrl: './rejected-table.component.html',
  styleUrls: ['./rejected-table.component.scss'],
})
export class RejectedTableComponent implements OnChanges{

  @Input() data!:SunatErrors[];
  public treatedData!: any[];

  ngOnChanges(): void {
    this.treatedData = this.data.map(e=>{
      return {
        "1": e.longSunatStatus,
        "2": e.sunatMessage,
        "3": e.longDocType,
        "4": e.count
      }
    });
    this.treatedData.forEach(e=>delete e.docType);
  }

}
