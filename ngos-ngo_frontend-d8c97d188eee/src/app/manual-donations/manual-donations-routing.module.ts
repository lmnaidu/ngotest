import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddManualDonationsComponent } from './add-manual-donations/add-manual-donations.component';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';




const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: AddManualDonationsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualDonationsRoutingModule { }
