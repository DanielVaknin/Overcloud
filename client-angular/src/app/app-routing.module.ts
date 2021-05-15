import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CloudAccountsComponent} from "./components/cloud-accounts/cloud-accounts.component";
import {RecommendationsComponent} from "./components/recommendations/recommendations.component";

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate : [AuthGuard] },
  { path: 'cloud-accounts', component: CloudAccountsComponent, canActivate : [AuthGuard] },
  { path: 'recommendations', component: RecommendationsComponent, canActivate : [AuthGuard] },
  // { path: 'phones/:id', component: UpdatePhoneComponent, canActivate : [AuthGuard] },
  { path: 'login', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }