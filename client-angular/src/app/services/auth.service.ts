import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = environment.authUrl;

  constructor(private http: HttpClient) {
  }

  public isAuthenticated(): Boolean {
    let userData = localStorage.getItem('userInfo')
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }

  public setUserInfo(user: { user: Object; }) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public getUserName() : String {
    if (this.isAuthenticated()) {
      return JSON.parse(<string>localStorage.getItem('userInfo'))['user']['name'];
    }
    return ""
  }

  public removeUserInfo() {
    localStorage.removeItem('userInfo');
  }

  public validate(email: string, password: string) {
    return this.http.post(this.usersUrl + '/login', {'username': email, 'password': password}).toPromise()
  }
}
