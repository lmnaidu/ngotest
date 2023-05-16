import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProposeProjectDashboardComponent } from './propose-project-dashboard/propose-project-dashboard.component';
import { RouterOutletComponent } from '../../layout/router-outlet/router-outlet.component';

const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: ProposeProjectDashboardComponent }
 

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposeProjectRoutingModule { }
