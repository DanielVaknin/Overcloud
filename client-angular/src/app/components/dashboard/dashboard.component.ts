import {Component, OnInit} from '@angular/core';
import {BillingService} from "../../services/billing.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../../vendor/fontawesome-free/css/all.min.css']
})
export class DashboardComponent implements OnInit {

  // phones: Phone[] = [];
  currentBill: string = "Calculating...";
  billAfterSavings: string = "Calculating...";
  chartData = []

  constructor(private billingService: BillingService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.billingService.getCurrentBill().subscribe(data => {
      const map = new Map<string, any>(Object.entries(data));

      if (map.has("data") && map.get("data")["currentBill"] !== undefined) {
        this.currentBill = parseFloat(map.get("data")['currentBill']).toFixed(2).toString();
      }
    })
    // this.phonesService.getPhones().subscribe(data => {
    //   this.phones = data;
    //   this.chartData.push({"Component": "Phones", "Count": data.length});
    // });
    //
    // this.usersService.getUsers().subscribe(data => {
    //   this.users = data;
    //   this.chartData.push({"Component": "Users", "Count": data.length});
    // })
    //
    // this.reviewsService.getReviews().subscribe(data => {
    //   this.reviews = data;
    //   this.chartData.push({"Component": "Reviews", "Count": data.length});
    // })
    //
    // this.ordersService.getOrders().subscribe(data => {
    //   this.orders = data;
    //   this.chartData.push({"Component": "Orders", "Count": data.length});
    // })
  }
}
