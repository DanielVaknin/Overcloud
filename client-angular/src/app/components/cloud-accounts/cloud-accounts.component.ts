import {Component} from '@angular/core';
import {CloudAccount} from 'src/app/models/cloud-account';
import {CloudAccountsService} from 'src/app/services/cloud-accounts.service';
import {RecommendationsService} from "../../services/recommendations.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AddAccountDialogComponent} from "./add-account-dialog/add-account-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './cloud-accounts.component.html',
  styleUrls: ['./cloud-accounts.component.scss',
    '../../vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class CloudAccountsComponent {

  CLOUD_PROVIDERS_LOGOS: any;
  cloudAccounts: CloudAccount[] = [];

  constructor(private cloudAccountsService: CloudAccountsService,
              private recommendationsService: RecommendationsService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              private router: Router) {
    this.CLOUD_PROVIDERS_LOGOS = cloudAccountsService.CLOUD_PROVIDERS_LOGOS;
  }

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

  onViewRecommendations(accountId: string) {
    this.cloudAccountsService.setCurrentAccount(accountId);
    this.router.navigate(['/recommendations'])
  }

  onDelete(accountId: string) {
    this._snackBar.open("Cloud account deleted successfully!", "Dismiss");
  }
}
