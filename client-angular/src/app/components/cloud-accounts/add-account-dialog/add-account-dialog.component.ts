import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CloudAccountsService} from "../../../services/cloud-accounts.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecommendationsService} from "../../../services/recommendations.service";

@Component({
  selector: 'app-add-account-dialog',
  templateUrl: './add-account-dialog.component.html',
  styleUrls: ['./add-account-dialog.component.scss']
})
export class AddAccountDialogComponent {

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

  CLOUD_PROVIDERS_LOGOS: any[] = [
    {value: 'aws', src: 'assets/amazon-web-services-logo.svg', disabled: false},
    {value: 'azure', src: 'assets/azure-logo.svg', disabled: true},
    {value: 'gcp', src: 'assets/google-cloud-logo.svg', disabled: true}
  ];

  constructor(
    public dialogRef: MatDialogRef<AddAccountDialogComponent>,
    private cloudAccountsService: CloudAccountsService,
    private recommendationsService: RecommendationsService,
    private _snackBar: MatSnackBar) {
  }

  onAddClick() {
    this._snackBar.open("Adding cloud account...", "Dismiss");
    this.cloudAccountsService.validateCloudAccount(this.cloudProvider, this.accessKey, this.secretAccessKey)
      .subscribe(data => {
        this.cloudAccountsService.addCloudAccount(this.cloudProvider, this.displayName, this.accessKey, this.secretAccessKey, this.scanInterval)
          .subscribe(data => {
            this.recommendationsService.addRecommendationsScanSchedule(data._id, this.scanInterval).subscribe(data => {
              this._snackBar.open("Cloud account added successfully!", "Dismiss");
              this.dialogRef.close();
              location.reload();
            }, error => {
              console.log(error);
              this._snackBar.open(error['error']['error'], "Dismiss")
            });
          }, error => {
            this._snackBar.open(error['error']['error'], "Dismiss")
          });
      }, error => {
        this._snackBar.open(error['error']['error'], "Dismiss")
      });
  }

  onValidateClick() {
    this.cloudAccountsService.validateCloudAccount(this.cloudProvider, this.accessKey, this.secretAccessKey)
      .subscribe(data => {
        this._snackBar.open('Account was validated successfully', "Dismiss")
      }, error => {
        this._snackBar.open(error['error']['error'], "Dismiss")
      });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
