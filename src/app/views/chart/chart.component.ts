import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [AgChartsAngular],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnChanges {
  public chartOptions: AgChartOptions = {};
  @Input({ required: true }) chartData: any;
  @Input({ required: true }) chartSeries: any;

  ngOnChanges() {
    this.chartOptions = {
      data: this.chartData,
      series: this.chartSeries,
      theme: 'ag-default-dark',
      height: 600,
    };
  }
}
