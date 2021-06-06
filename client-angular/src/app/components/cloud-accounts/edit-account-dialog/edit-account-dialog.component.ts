import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CloudAccountsService} from "../../../services/cloud-accounts.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecommendationsService} from "../../../services/recommendations.service";

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: './edit-account-dialog.component.html',
  styleUrls: ['./edit-account-dialog.component.scss']
})
export class EditAccountDialogComponent {

  cloudProvider: string = ""
  displayName: string = ""
  accessKey: string = ""
  secretAccessKey: string = ""
  scanInterval: number = 0

  CLOUD_PROVIDERS: any[] = [
    {value: 'aws', viewValue: 'AWS', disabled: false},
    {value: 'azure', viewValue: 'Azure (Coming soon)', disabled: true},
    {value: 'gcp', viewValue: 'GCP (Coming soon)', disabled: true}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {cloudAccountId: string},
              public dialogRef: MatDialogRef<EditAccountDialogComponent>,
              private cloudAccountsService: CloudAccountsService,
              private recommendationsService: RecommendationsService,
              private _snackBar: MatSnackBar) {
    cloudAccountsService.getCloudAccount(data['cloudAccountId']).subscribe(data => {
      this.cloudProvider = data.cloudProvider;
      this.displayName = data.displayName;
      this.accessKey = data.accessKey;
      this.secretAccessKey = data.secretKey;
      this.scanInterval = data.scanInterval;
    });
  }

  onSaveClick() {
    this.cloudAccountsService.validateCloudAccount(this.cloudProvider, this.accessKey, this.secretAccessKey)
      .subscribe(data => {
        this.cloudAccountsService.addCloudAccount(this.cloudProvider, this.displayName, this.accessKey, this.secretAccessKey, this.scanInterval)
          .subscribe(data => {
            this.recommendationsService.addRecommendationsScanSchedule(data._id, this.scanInterval).subscribe(data => {
              this._snackBar.open("Cloud account added successfully!", "Dismiss");
              this.dialogRef.close();
              location.reload();
            }, error => {
              this._snackBar.open(error['error']['error'], "Dismiss")
            });
          });
      }, error => {
        this._snackBar.open(error['error']['error'], "Dismiss")
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
