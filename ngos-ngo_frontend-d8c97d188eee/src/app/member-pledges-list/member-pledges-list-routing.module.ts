import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { MemberPledgesListComponent } from './member-pledges-list/member-pledges-list.component';



const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: MemberPledgesListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberPledgesListRoutingModule { }
