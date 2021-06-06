import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CloudAccount} from "../models/cloud-account";

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  private recommendationsUrl = environment.recommendationsUrl;

  constructor(private http: HttpClient) { }

  // getRecommendations(): Observable<any[]> {
  //   return this.http.get<any[]>(this.recommendationsUrl, {
  //     params: {
  //       cloud_account: "60a2cd9e0f44e1062c31e297"
  //     }
  //   });
  // }

  getRecommendationsForCloudAccount(accountId: string): Observable<any[]> {
    return this.http.get<any[]>(this.recommendationsUrl, {
      params: {
        cloud_account: accountId
      }
    });
  }

  scanRecommendations(cloudAccountId: string): Observable<any[]> {
    return this.http.post<any[]>(this.recommendationsUrl + "/scan", {
      cloud_account: cloudAccountId
    });
  }

  remediateRecommendation(cloudAccountId: string, recommendationType: string): Observable<any[]> {
    return this.http.post<any[]>(this.recommendationsUrl + "/remediate", {
      cloud_account: cloudAccountId,
      recommendation_type: recommendationType
    });
  }

  deleteRecommendationsForCloudAccount(accountId: string): Observable<any> {
    return this.http.delete(this.recommendationsUrl, {
      params: {
        cloud_account: accountId
      }
    });
  }

  addRecommendationsScanSchedule(accountId: string, scanInterval: number): Observable<any> {
    return this.http.post<CloudAccount>(this.recommendationsUrl + "/schedule-scan", {
      cloud_account: accountId,
      scan_interval: scanInterval
    });
  }
}
