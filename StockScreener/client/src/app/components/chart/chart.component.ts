import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {
  
  // lineChart
  public lineChartData: Array<any> = [{data: [], }];
  public lineChartLabels: Array<any> = [];
  public showChart: boolean = false;
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
  public lineChartOptions: any = {
    responsive: true,
    legend: {display: false},
    // scales:
    // {
    //     xAxes: [{
    //         display: false
    //     }]
    // }
    elements: { point: { radius: 0 } }
  };
  public lineChartColors: Array<any> = [
    {
        backgroundColor: 'transparent',
        borderColor: 'rgb(66, 244, 69)'
    }
  ];

  // Assumes graph data comes in reverse chronological order
  public populateData(chartData: Array<number>, chartLabels: Array<any>) {
    if (chartData.length === 0 || chartLabels.length === 0) {
      this.lineChartData = [{data: [], }];
      this.lineChartLabels = [];
      this.showChart = false;
    } else {
      // Should't have to do this.  Bug in ng2-charts where it doesnt update x axis
      setTimeout(() => {
        this.lineChartLabels = chartLabels;
        this.lineChartData[0]['data'] = chartData; }, 0);
      this.lineChartColors = [
        {
          backgroundColor: 'transparent',
          borderColor: chartData[chartData.length - 1] - chartData[0] > 0 ? 'rgb(66, 244, 69)' : 'rgb(244, 65, 65)',
        }
      ];
      this.showChart = true;
    }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this.showChart = false;
  }
}
