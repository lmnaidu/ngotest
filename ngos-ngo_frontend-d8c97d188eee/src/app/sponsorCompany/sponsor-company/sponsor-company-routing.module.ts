import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../../layout/router-outlet/router-outlet.component';
import { SponsorCompanyComponent } from './sponsor-company/sponsor-company.component';

const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: SponsorCompanyComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorCompanyRoutingModule { }
