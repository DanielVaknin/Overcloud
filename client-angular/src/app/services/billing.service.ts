import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private billingUrl = environment.billingUrl;

  constructor(private http: HttpClient) { }

  getCurrentBill(): Observable<any[]> {
    return this.http.get<{}[]>(this.billingUrl, {
      params: {
        cloud_account: "60a2cd9e0f44e1062c31e297"
      }
    });
  }
}
