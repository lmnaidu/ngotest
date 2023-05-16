import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { MemberEventsDashboardComponent } from './member-events-dashboard/member-events-dashboard.component';



const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: MemberEventsDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberEventsRoutingModule { }
