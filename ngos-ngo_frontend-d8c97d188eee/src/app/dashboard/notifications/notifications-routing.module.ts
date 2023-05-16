import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../../layout/router-outlet/router-outlet.component';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';


const routes: Routes = [{
   path: '', component: RouterOutletComponent, children: [
      { path: '', component: NotificationsListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
