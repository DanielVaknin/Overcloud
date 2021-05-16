import {Component, OnInit} from '@angular/core';
import {RecommendationsService} from "../../services/recommendations.service";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  tableCols: string[] = [];
  tableData: {}[] = [];

  constructor(private recommendationsService: RecommendationsService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.recommendationsService.getRecommendations().subscribe(data => {
      const map = new Map<string, any>(Object.entries(data));

      if (map.has("recommendations") && map.get("recommendations") !== undefined) {
        this.tableCols = Object.keys(map.get("recommendations")[0])
          .filter((value) => value !== "_id")
          .filter((value) => value !== "data")
          .filter((value) => value !== "type");

        let recArr: any[] = map.get("recommendations")
        recArr.forEach(element => {
          // Format date
          let date = new Date(element.collectTime.$date);
          element.collectTime = date.toISOString().replace(/T/, ' ')
            .replace(/\..+/, '');

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
