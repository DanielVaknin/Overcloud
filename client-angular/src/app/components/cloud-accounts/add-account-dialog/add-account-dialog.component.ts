import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CloudAccountsService} from "../../../services/cloud-accounts.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  CLOUD_PROVIDERS: any[] = [
    {value: 'aws', viewValue: 'AWS', disabled: false},
    {value: 'azure', viewValue: 'Azure (Coming soon)', disabled: true},
    {value: 'gcp', viewValue: 'GCP (Coming soon)', disabled: true}
  ];

  constructor(
    public dialogRef: MatDialogRef<AddAccountDialogComponent>,
    private cloudAccountsService: CloudAccountsService,
    private _snackBar: MatSnackBar) {
  }

  onAddClick() {
    this.cloudAccountsService.validateCloudAccount(this.cloudProvider, this.accessKey, this.secretAccessKey)
      .subscribe(data => {
        this.cloudAccountsService.addCloudAccount(this.cloudProvider, this.displayName, this.accessKey, this.secretAccessKey)
          .subscribe(data => {
            this._snackBar.open("Cloud account added successfully!", "Dismiss");
            this.dialogRef.close();
            location.reload();
          });
      }, error => {
        this._snackBar.open(error['error']['error'], "Dismiss")
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
