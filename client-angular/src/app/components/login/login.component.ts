import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {

  }

  login(userEmail: string, userPassword: string) {
    this.authService.validate(userEmail, userPassword)
      .then((response) => {
        this.authService.setUserInfo({'user': response});
        this.router.navigate(['']);
      }, error => {
        alert("You entered an incorrect username/password")
      });
  }
}
