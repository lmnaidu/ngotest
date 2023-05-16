import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../../layout/router-outlet/router-outlet.component';
import { RequestProjectDashboardComponent } from './request-project-dashboard/request-project-dashboard.component';

const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: RequestProjectDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestProjectRoutingModule { }
