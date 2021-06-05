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

  possibleSavingsChartDatasets: Array<any> = [];
  possibleSavingsChartLabels: Array<any> = [];
  possibleSavingsChartType: string = 'bar';
  isLoadingPossibleSavingsChartData: boolean = true

  billPerServiceChartDatasets: Array<any> = [];
  billPerServiceChartLabels: Array<any> = [];
  billPerServiceChartElementsToDisplay: number = 5;
  billPerServiceChartType: string = 'doughnut';
  isLoadingBillPerServiceChartData: boolean = true

  constructor(private billingService: BillingService,
              private recommendationsService: RecommendationsService,
              private cloudAccountsService: CloudAccountsService) {
    this.cloudAccountsService.currentCloudAccountChange.subscribe(data => this.load());
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoadingPossibleSavingsChartData = true;
    this.isLoadingBillPerServiceChartData = true;

    this.currentBill = "Calculating...";
    this.possibleSavings = "Calculating...";
    const currentCloudAccount = this.cloudAccountsService.getCurrentAccount();

    if (currentCloudAccount !== "") {
      // Get current bill
      this.billingService.getCurrentBillForCloudAccount(currentCloudAccount).subscribe(data => {
        const map = new Map<string, any>(Object.entries(data));

        // Get current bill amount
        if (map.has("data") && map.get("data")["currentBill"] !== undefined) {
          this.currentBill = parseFloat(map.get("data")['currentBill']).toFixed(2).toString();
        }

        // Get bill per service data for chart
        if (map.has("data") && map.get("data")["billPerService"] !== undefined) {
          let billPerService: [{
            'service': string,
            'amount': number
          }] = map.get("data")["billPerService"]
          let chartData: number[] = [];
          let chartLabels: string[] = [];

          billPerService.slice(0, this.billPerServiceChartElementsToDisplay).forEach(element => {
            chartData.push(Number(element['amount'].toFixed(2)));
            chartLabels.push(element['service']);
          });

          this.billPerServiceChartDatasets = [
            {
              label: 'Possible Savings ($)',
              data: chartData
            }
          ];

          this.billPerServiceChartLabels = chartLabels;

          this.isLoadingBillPerServiceChartData = false;
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

        this.possibleSavingsChartDatasets = [
          {
            label: 'Possible Savings ($)',
            data: chartData
          }
        ];

        this.possibleSavingsChartLabels = chartLabels;
        this.possibleSavings = possibleSavings.toFixed(2).toString();

        this.isLoadingPossibleSavingsChartData = false;
      });
    }
  }
}
