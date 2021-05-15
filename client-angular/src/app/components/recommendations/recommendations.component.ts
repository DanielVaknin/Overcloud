import { Component, OnInit } from '@angular/core';
import {RecommendationsService} from "../../services/recommendations.service";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  recommendations: any[] = [];

  constructor(private recommendationsService: RecommendationsService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.recommendationsService.getRecommendations().subscribe(data => {
      this.recommendations = data;
    });
  }

}
