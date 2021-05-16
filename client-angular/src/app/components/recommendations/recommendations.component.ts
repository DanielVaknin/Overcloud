import {Component, OnInit} from '@angular/core';
import {RecommendationsService} from "../../services/recommendations.service";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  recommendations: any[] = [];
  tableCols: string[] = [];
  tableData: string[] = [];


  // tableCols = ['name', 'role', 'skillset'];
  // tableData = [
  //   {
  //     name: 'Harsha Chinni',
  //     role: 'Fullstack Developer',
  //     skillset: 'Angular 9, Python 3, Flask, DSA'
  //   },
  //   {
  //     name: 'Bob',
  //     role: 'HR',
  //     skillset: 'Finding awesome candidates like Harsha :p'
  //   },
  //   {
  //     name: 'COVID-19',
  //     role: 'Making people panick',
  //     skillset: 'Infect people'
  //   },
  // ];


  constructor(private recommendationsService: RecommendationsService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.recommendationsService.getRecommendations().subscribe(data => {
      this.recommendations = data;
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
          delete element._id;
          delete element.data;
          delete element.type;
        });

        console.log(recArr);
        this.tableData = recArr;
      }
    });
  }

}
