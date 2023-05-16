import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { BranchesDashboardComponent } from './branches-dashboard/branches-dashboard.component';


const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: BranchesDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
