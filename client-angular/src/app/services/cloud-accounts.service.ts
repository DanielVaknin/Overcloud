import { Injectable } from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CloudAccount} from "../models/cloud-account";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CloudAccountsService {

  CLOUD_PROVIDERS_LOGOS: any = {
    aws: 'assets/amazon-web-services-logo.svg',
    azure: 'assets/azure-logo.svg',
    gcp: 'assets/google-cloud-logo.svg'
  }

  private cloudAccountsUrl = environment.cloudAccountsUrl;
  private cloudAccountsPythonUrl = environment.cloudAccountsPythonUrl;

  private currentCloudAccount: string = "";
  public currentCloudAccountChange: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
    this.currentCloudAccountChange.subscribe(data => this.currentCloudAccount = data);
  }

  setCurrentAccount(accountId: string): void {
    this.currentCloudAccountChange.next(accountId);
  }

  getCurrentAccount(): string {
    return this.currentCloudAccount;
  }

  getCloudAccounts(): Observable<CloudAccount[]> {
    return this.http.get<CloudAccount[]>(this.cloudAccountsUrl);
  }

  getCloudAccount(id: string): Observable<CloudAccount> {
    const url = `${this.cloudAccountsUrl}/${id}`;
    return this.http.get<CloudAccount>(url);
  }

  deleteCloudAccount(id: string): Observable<CloudAccount> {
    const url = `${this.cloudAccountsUrl}/${id}`;
    return this.http.delete<CloudAccount>(url);
  }

  addCloudAccount(provider: string, displayName: string, accessKey: string, secretAccessKey: string) {
    return this.http.post<CloudAccount>(this.cloudAccountsUrl, {
      cloudProvider: provider,
      displayName: displayName,
      accessKey: accessKey,
      secretKey: secretAccessKey
    });
  }

  validateCloudAccount(provider: string, accessKey: string, secretAccessKey: string) {
    return this.http.post<CloudAccount>(this.cloudAccountsPythonUrl + '/validate', {
      cloudProvider: provider,
      credentials: {
        accessKey: accessKey,
        secretKey: secretAccessKey
      }
    });
  }
}
