import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../../vendor/fontawesome-free/css/all.min.css']
})
export class DashboardComponent implements OnInit {

  // phones: Phone[] = [];

  chartData = []

  constructor() {
  }

  ngOnInit() {
    this.load();
  }

  load() {
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
