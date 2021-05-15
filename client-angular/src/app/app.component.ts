import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OverCloud';

  constructor(private authService: AuthService, private router: Router) {
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
}
