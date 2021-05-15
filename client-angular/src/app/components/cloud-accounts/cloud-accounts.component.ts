import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {CloudAccount} from 'src/app/models/cloud-account';
import {CloudAccountsService} from 'src/app/services/cloud-accounts.service';
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private cloudAccountSerice: CloudAccountsService, private activatedRoute: ActivatedRoute, private router: Router) {  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.cloudAccountSerice.getCloudAccounts().subscribe(data => {
      this.cloudAccounts = data;
    });
  }

  // onAdd(displayName: string, manufacturer: string, imageUrl: string, price: number, discount: number) {
  //   this.phonesService.addPhone(displayName, manufacturer, imageUrl, price, discount).subscribe(() => {
  //     this.load();
  //   });
  // }

  // onDelete(phoneId: string) {
  //   this.phonesService.deletePhone(phoneId).subscribe(() => {
  //     this.load();
  //   });
  // }

  // onSearch(name: string, manufacturer: string, maxPrice: number) {
  //   this.searchPhoneName = name ;
  //   this.searchPhoneManufacturer = manufacturer;
  //   this.searchPhoneMaxPrice = isNaN(maxPrice) ? Number.MAX_SAFE_INTEGER : maxPrice;
  //
  //   this.load();
  // }
}
