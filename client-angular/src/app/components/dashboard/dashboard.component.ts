import {Component, OnInit} from '@angular/core';
import {BillingService} from "../../services/billing.service";
import {RecommendationsService} from "../../services/recommendations.service";
import {CloudAccountsService} from "../../services/cloud-accounts.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentBill: string = "Calculating...";
  possibleSavings: string = "Calculating...";

  chartDatasets: Array<any> = [];
  chartLabels: Array<any> = [];
  isLoadingChartData = true;

  constructor(private billingService: BillingService,
              private recommendationsService: RecommendationsService,
              private cloudAccountsService: CloudAccountsService) {
    this.cloudAccountsService.currentCloudAccountChange.subscribe(data => this.load());
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoadingChartData = true;
    this.currentBill = "Calculating...";
    this.possibleSavings = "Calculating...";
    const currentCloudAccount = this.cloudAccountsService.getCurrentAccount();

    if (currentCloudAccount !== "") {
      // Get current bill
      this.billingService.getCurrentBillForCloudAccount(currentCloudAccount).subscribe(data => {
        const map = new Map<string, any>(Object.entries(data));

        if (map.has("data") && map.get("data")["currentBill"] !== undefined) {
          this.currentBill = parseFloat(map.get("data")['currentBill']).toFixed(2).toString();
        }
      });

      // Get recommendations possible savings for the graph
      this.recommendationsService.getRecommendationsForCloudAccount(currentCloudAccount).subscribe(data => {
        let possibleSavings: number = 0;
        let chartData: number[] = [];
        let chartLabels: string[] = [];

        const map = new Map<string, any>(Object.entries(data));
        let recArr: any[] = map.get("recommendations");

        recArr.forEach(element => {
          possibleSavings += parseFloat(element['totalPrice']);

          chartData.push(element['totalPrice']);
          chartLabels.push(element['name']);
        });

        this.chartDatasets = [
          {
            label: 'Possible Savings ($)',
            data: chartData
          }
        ];

        this.chartLabels = chartLabels;
        this.possibleSavings = possibleSavings.toFixed(2).toString();

        this.isLoadingChartData = false;
      });
    }
  }
}
