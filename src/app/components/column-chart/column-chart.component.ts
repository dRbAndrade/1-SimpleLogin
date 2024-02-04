import { Component, Input, OnChanges, ViewChild } from "@angular/core";
import { ApexChart, ApexAxisChartSeries, ChartComponent, ApexDataLabels, ApexPlotOptions, ApexYAxis, ApexLegend, ApexGrid} from "ng-apexcharts";
import { ColumnChartData } from "../../types/column-chart-data"

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: "column-chart",
  templateUrl: "./column-chart.component.html",
  styleUrls: ["./column-chart.component.scss"]
})
export class ColumnChartComponent implements OnChanges{
  @ViewChild("chart") chart?: ChartComponent;
  @Input() chartData!: ColumnChartData;
  public chartOptions!: Partial<any>;

  ngOnChanges(): void {
    this.chartOptions = {
      title: {
        text: this.chartData.title
      },
      series: [
        {
          name: this.chartData.name,
          data: [...this.chartData.data.values()]
        }
      ],
      xaxis: {
        categories: [...this.chartData.data.keys()],
        labels: {
          style: {
            fontSize: "16px"
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "16px"
          }
        }
      },
      chart: {
        height: 350,
        type: "bar",
      },
      colors: [
        "#008FFB"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      }
    };
  }

}
