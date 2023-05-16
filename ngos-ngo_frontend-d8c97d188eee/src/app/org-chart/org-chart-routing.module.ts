import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { OrgchartComponent } from './orgchart/orgchart.component';


const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: 'orgchart', component: OrgchartComponent },
      { path: '', redirectTo: 'orgchart', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgChartRoutingModule { }
