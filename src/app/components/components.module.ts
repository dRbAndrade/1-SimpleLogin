import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFooterComponent } from './custom-footer/custom-footer.component';
import { IonicModule } from '@ionic/angular';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { RejectedTableComponent } from './rejected-table/rejected-table.component';
import { CustomMenuButtonComponent } from './custom-menu-button/custom-menu-button.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    PieChartComponent,
    ColumnChartComponent,
    CustomFooterComponent,
    RejectedTableComponent,
    CustomMenuButtonComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgApexchartsModule
  ],
  exports:[
    PieChartComponent,
    ColumnChartComponent,
    CustomFooterComponent,
    RejectedTableComponent,
    CustomMenuButtonComponent,
    SpinnerComponent
  ]
})
export class ComponentsModule { }
