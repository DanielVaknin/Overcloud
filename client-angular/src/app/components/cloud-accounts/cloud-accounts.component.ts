import {Component} from '@angular/core';
import {CloudAccount} from 'src/app/models/cloud-account';
import {CloudAccountsService} from 'src/app/services/cloud-accounts.service';
import {RecommendationsService} from "../../services/recommendations.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AddAccountDialogComponent} from "./add-account-dialog/add-account-dialog.component";

@Component({
  selector: 'app-list',
  templateUrl: './cloud-accounts.component.html',
  styleUrls: ['./cloud-accounts.component.scss',
    '../../vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class CloudAccountsComponent {

  LOGOS: any = {
    aws: 'assets/amazon-web-services-logo.svg',
    azure: 'assets/azure-logo.svg',
    gcp: 'assets/google-cloud-logo.svg'
  }

  cloudAccounts: CloudAccount[] = [];

  constructor(private cloudAccountsService: CloudAccountsService,
              private recommendationsService: RecommendationsService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) {  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.cloudAccountsService.getCloudAccounts().subscribe(data => {
      this.cloudAccounts = data;
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddAccountDialogComponent, {
      restoreFocus: false,
      // width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onScan(accountId: string) {
    this._snackBar.open("Scanning account for recommendations...", "Dismiss");
    this.recommendationsService.scanRecommendations(accountId).subscribe(data => {
      console.log(data);
    });
  }

  onDelete(accountId: string) {
    this._snackBar.open("Cloud account deleted successfully!", "Dismiss");
  }
}
