import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RouterOutletComponent } from '../../layout/router-outlet/router-outlet.component';
import { MemberDonationsDashboardComponent } from './member-donations-dashboard/member-donations-dashboard.component';

const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: MemberDonationsDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberDonationsRoutingModule { }
