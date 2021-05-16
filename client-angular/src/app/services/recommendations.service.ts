import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  private recommendationsUrl = environment.recommendationsUrl;

  constructor(private http: HttpClient) { }

  getRecommendations(): Observable<any[]> {
    return this.http.get<any[]>(this.recommendationsUrl, {
      params: {
        cloud_account: "60804727b9bd311668a8ad33"
      }
    });
  }
}
