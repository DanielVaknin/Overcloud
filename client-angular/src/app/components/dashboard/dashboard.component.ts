import {Component, OnInit} from '@angular/core';
import {BillingService} from "../../services/billing.service";
import {RecommendationsService} from "../../services/recommendations.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentBill: string = "Calculating...";
  billAfterSavings: string = "Calculating...";

  chartDatasets: Array<any> = [];
  chartLabels: Array<any> = [];
  isLoadingChartData = true;

  constructor(private billingService: BillingService,
              private recommendationsService: RecommendationsService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    // Get current bill
    this.billingService.getCurrentBill().subscribe(data => {
      const map = new Map<string, any>(Object.entries(data));

      if (map.has("data") && map.get("data")["currentBill"] !== undefined) {
        this.currentBill = parseFloat(map.get("data")['currentBill']).toFixed(2).toString();
      }
    });

    // Get recommendations possible savings for the graph
    this.recommendationsService.getRecommendations().subscribe(data => {
      let chartData: number[] = [];
      let chartLabels: string[] = [];

      const map = new Map<string, any>(Object.entries(data));
      let recArr: any[] = map.get("recommendations");


      recArr.forEach(element => {
        chartData.push(element['totalPrice']);
        chartLabels.push(element['name']);
      });

      this.chartDatasets = [
        {
          label: 'Possible Savings',
          data: chartData
        }
      ];

      this.chartLabels = chartLabels;

      this.isLoadingChartData = false;
    });
  }
}
