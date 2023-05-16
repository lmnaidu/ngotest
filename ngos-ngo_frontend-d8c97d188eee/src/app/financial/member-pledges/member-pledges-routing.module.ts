import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../../layout/router-outlet/router-outlet.component';
import { MemberPledgesDashboardComponent } from './member-pledges-dashboard/member-pledges-dashboard.component';

const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: MemberPledgesDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberPledgesRoutingModule { }
