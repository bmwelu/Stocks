import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {
  // lineChart
  public lineChartData: Array<any> = [{data: [], }, {data: [], }];
  public lineChartLabels: Array<any> = [];
  public showChart = false;
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartOptions = {
    responsive: true,
    legend: {display: false},
    scales:
    {
        xAxes: [{
            display: false
        }]
    },
    elements: { point: { radius: 0 } }
  };
  public lineChartColors = [ {}, {} ];

  public ngOnInit(): void {
    this.showChart = false;
  }

  // Assumes graph data comes in reverse chronological order
  public populateData(chartData: Array<number>, chartLabels: Array<any>): void {
    if (chartData.length === 0 || chartLabels.length === 0) {
      this.lineChartData = [{data: [], }, {data: [], }];
      this.lineChartLabels = [];
      this.lineChartColors = [{}, {}];
      this.showChart = false;
    } else {
      const lastChartValue = chartData.filter(x => x).pop();
      // Should't have to do this.  Bug in ng2-charts where it doesnt update x axis
      setTimeout(() => {
        if (chartLabels[0] === 'previousClose') {
            this.lineChartLabels = chartLabels.slice(1, chartLabels.length);
            this.lineChartData[0]['data'] = chartData.slice(1, chartData.length);
            const previousCloseValues = new Array(chartData.length - 1);
            previousCloseValues.fill(chartData[0]);
            this.lineChartData[1]['data'] = previousCloseValues;
            this.lineChartColors = [
                {
                  backgroundColor: 'transparent',
                  borderColor: (lastChartValue === undefined) ? 0 : lastChartValue - chartData[0] > 0 ?
                  'rgb(66, 244, 69)' : 'rgb(244, 65, 65)'
                },
                {
                    backgroundColor: 'transparent',
                    borderColor: 'rgb(220,220,220)'
                }
            ];
        } else {
            this.lineChartLabels = chartLabels;
            this.lineChartData[0]['data'] = chartData;
            this.lineChartData[1]['data'] = [];
            this.lineChartColors = [
                {
                  backgroundColor: 'transparent',
                  borderColor: (lastChartValue === undefined) ? 0 : lastChartValue - chartData[0] > 0 ?
                  'rgb(66, 244, 69)' : 'rgb(244, 65, 65)'
                }, {}
            ];
        }}, 0);
      this.showChart = true;
    }
}

// events
public chartClicked(e: any): void { }
public chartHovered(e: any): void { }

}
