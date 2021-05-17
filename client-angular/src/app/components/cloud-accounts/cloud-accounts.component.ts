import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {CloudAccount} from 'src/app/models/cloud-account';
import {CloudAccountsService} from 'src/app/services/cloud-accounts.service';
import {ActivatedRoute, Router} from "@angular/router";
import {RecommendationsService} from "../../services/recommendations.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list',
  templateUrl: './cloud-accounts.component.html',
  styleUrls: ['./cloud-accounts.component.scss',
    '../../vendor/fontawesome-free/css/all.min.css',
    '../../vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class CloudAccountsComponent {

  cloudAccounts: CloudAccount[] = [];

  constructor(private cloudAccountsService: CloudAccountsService,
              private recommendationsService: RecommendationsService,
              private _snackBar: MatSnackBar) {  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.cloudAccountsService.getCloudAccounts().subscribe(data => {
      this.cloudAccounts = data;
    });
  }

  onScan(accountId: string) {
    this._snackBar.open("Scanning account for recommendations...", "Dismiss");
    this.recommendationsService.scanRecommendations(accountId).subscribe(data => {
      console.log(data);
    });
  }
}
