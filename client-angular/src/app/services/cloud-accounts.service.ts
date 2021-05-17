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

  addCloudAccount(provider: string, displayName: string, accessKey: string, secretAccessKey: string) {
    return this.http.post<CloudAccount>(this.cloudAccountsUrl, {
      cloudProvider: provider,
      displayName: displayName,
      accessKey: accessKey,
      secretKey: secretAccessKey
    })
  }
}
