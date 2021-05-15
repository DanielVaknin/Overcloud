import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {CloudAccount} from "../models/cloud-account";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CloudAccountsService {
  private cloudAccountsUrl = environment.cloudAccountsUrl;

  constructor(private http: HttpClient) { }

  getCloudAccounts(): Observable<CloudAccount[]> {
    return this.http.get<CloudAccount[]>(this.cloudAccountsUrl);
  }

  getCloudAccount(id: string): Observable<CloudAccount> {
    const url = `${this.cloudAccountsUrl}/${id}`;
    return this.http.get<CloudAccount>(url);
  }

  // deleteOrder(id: string): Observable<Order> {
  //   const url = `${this.ordersUrl}/${id}`;
  //   return this.http.delete<Order>(url);
  // }

  // searchUsersWithMinOrders(minOrders: number): Observable<UsersMinOrder[]> {
  //   console.log(minOrders)
  //   const url = this.ordersUrl + '/find';
  //   return this.http.get<UsersMinOrder[]>(url, {
  //     params: {
  //       num: minOrders.toString()
  //     }
  //   });
  // }
}
