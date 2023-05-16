import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { MemberProjectsDashboardComponent } from './member-projects-dashboard/member-projects-dashboard.component';



const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: MemberProjectsDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberProjectsRoutingModule { }
