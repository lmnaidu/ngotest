import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RouterOutletComponent } from '../../layout/router-outlet/router-outlet.component';
import { OrganizationDonationsDashboardComponent } from './organization-donations-dashboard/organization-donations-dashboard.component';

const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: OrganizationDonationsDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationDonationsRoutingModule { }
