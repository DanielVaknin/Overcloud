import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecommendationsService} from "../../../services/recommendations.service";

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
              public dialogRef: MatDialogRef<RecommendationDetailsComponent>,
              private _snackBar: MatSnackBar,
              private recommendationsService: RecommendationsService) {
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
    this.recommendationsService.remediateRecommendation(this.cloudAccountId, this.recType).subscribe(data => {
      this.dialogRef.close();
    });
  }
}
