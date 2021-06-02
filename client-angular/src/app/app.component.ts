import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {CloudAccountsService} from "./services/cloud-accounts.service";
import {CloudAccount} from "./models/cloud-account";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OverCloud';
  cloudAccounts: CloudAccount[] = [];
  selectedCloudAccount: string = "";

  constructor(private authService: AuthService,
              private router: Router,
              private cloudAccountsService: CloudAccountsService) {
    this.cloudAccountsService.getCloudAccounts().subscribe(data => {
      this.cloudAccounts = data;
      this.onCurrentCloudAccountChange(data[0]._id);
    });
    this.cloudAccountsService.currentCloudAccountChange.subscribe(data => this.selectedCloudAccount = data);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getUserName() {
    return this.authService.getUserName();
  }

  onLogout() {
    this.authService.removeUserInfo();
    this.router.navigate(['/login']);
  }

  onCurrentCloudAccountChange(accountId: string) {
    this.selectedCloudAccount = accountId;
    this.cloudAccountsService.setCurrentAccount(accountId);
  }
}
