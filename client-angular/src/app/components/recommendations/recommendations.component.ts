import {Component, OnInit} from '@angular/core';
import {RecommendationsService} from "../../services/recommendations.service";
import {CloudAccountsService} from "../../services/cloud-accounts.service";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  tableCols: string[] = [];
  tableData: {}[] = [];

  COLS_TO_HIDE = [
    "_id",
    "data",
    "type",
    "accountId"
  ]

  isLoading = true;

  constructor(private recommendationsService: RecommendationsService,
              private cloudAccountsService: CloudAccountsService) {
    this.cloudAccountsService.currentCloudAccountChange.subscribe(data => this.load());
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    const currentCloudAccount = this.cloudAccountsService.getCurrentAccount();

    if (currentCloudAccount !== "") {

      this.recommendationsService.getRecommendationsForCloudAccount(currentCloudAccount).subscribe(data => {
        const map = new Map<string, any>(Object.entries(data));

        if (map.has("recommendations") && map.get("recommendations") !== undefined) {
          this.isLoading = false;

          if (map.get("recommendations")[0] === null) {
            this.tableCols = [];
            this.tableData = [];
            return
          }

          // Get table columns (headers)
          this.tableCols = Object.keys(map.get("recommendations")[0])
          // .filter((value) => value !== "_id")
          // .filter((value) => value !== "data")
          // .filter((value) => value !== "type")

          // Get table data
          let recArr: any[] = map.get("recommendations")
          recArr.forEach(element => {
            // Format date
            let date = new Date(element.collectTime.$date);
            element.collectTime = date.toISOString().replace(/T/, ' ')
              .replace(/\..+/, '');

            // Add price currency
            element['totalPrice'] = element['totalPrice'] + " $";

            // Remove unneeded elements
            // delete element._id;
            // delete element.data;
            // delete element.type;
          });

          this.tableData = recArr;
        }
      });
    }
  }

}
