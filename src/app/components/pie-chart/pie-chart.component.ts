import { Component, Input, OnChanges, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

@Component({
  selector: "pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"]
})
export class PieChartComponent implements OnChanges{

  @ViewChild("chart") chart!: ChartComponent;
  @Input() data!: Map<string,number>;
  public chartOptions!: Partial<any>;

  ngOnChanges(): void {
    this.chartOptions = {
      labels: [...this.data.keys()],
      series: [...this.data.values()],
      colors: ["#00E396","#FF6384","#008FFB","#FFE770","#775DD0"],
      plotOptoins:{
        pie:{
          expandOnClick: true
        }
      },
      chart: {
        width: "100%",
        height: 400,
        type: "pie",
        animations: {
          enabled: false
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

}
