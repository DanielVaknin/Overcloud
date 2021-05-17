import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-recommendation-details',
  templateUrl: './recommendation-details.component.html',
  styleUrls: ['./recommendation-details.component.scss']
})
export class RecommendationDetailsComponent implements OnInit {

  tableCols: string[] = [];
  tableData: {}[] = [];

  recType: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: {}) {
    // @ts-ignore
    this.recType = data["recType"]
    // @ts-ignore
    this.tableCols = data["tableCols"]
    // @ts-ignore
    this.tableData = data["tableData"]
  }

  ngOnInit(): void {
  }
}