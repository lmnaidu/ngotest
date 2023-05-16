import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { DigitalConnectDashboardComponent } from './digital-connect-dashboard/digital-connect-dashboard.component';

const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: DigitalConnectDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalConnectRoutingModule { }
