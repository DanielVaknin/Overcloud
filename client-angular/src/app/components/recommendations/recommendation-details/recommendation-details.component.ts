import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-recommendation-details',
  templateUrl: './recommendation-details.component.html',
  styleUrls: ['./recommendation-details.component.scss']
})
export class RecommendationDetailsComponent implements OnInit {

  tableCols: string[] = [];
  tableData: {}[] = [];

  cloudAccountId: string = "";
  recType: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: {},
              private _snackBar: MatSnackBar) {
    // @ts-ignore
    this.cloudAccountId = data["cloudAccountId"]
    // @ts-ignore
    this.recType = data["recType"]
    // @ts-ignore
    this.tableCols = data["tableCols"]
    // @ts-ignore
    this.tableData = data["tableData"]
  }

  ngOnInit(): void {
  }

  onRemediateClick(): void {
    this._snackBar.open(`Remediating recommendation: ${this.recType}`, "Dismiss");
    console.log(`Remediating recommendation ${this.recType} in cloud account ${this.cloudAccountId}`);
  }
}
