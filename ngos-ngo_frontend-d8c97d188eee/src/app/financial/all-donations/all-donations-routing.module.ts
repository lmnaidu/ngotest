import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../../layout/router-outlet/router-outlet.component';
import { AllDonationsComponent } from './all-donations/all-donations.component';

const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: AllDonationsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllDonationsRoutingModule { }
