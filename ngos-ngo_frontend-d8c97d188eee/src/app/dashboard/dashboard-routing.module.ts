import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { OrgInfoComponent } from './org-info/org-info.component';


const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'org-info', component: OrgInfoComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
