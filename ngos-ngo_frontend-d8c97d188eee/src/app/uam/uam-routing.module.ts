import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { UsersComponent } from './users/users.component';
import { UserTypesComponent } from './user-types/user-types.component';


const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: 'all-users', component: UsersComponent },
      { path: 'userTypes', component: UserTypesComponent },
      { path: '', redirectTo: 'all-users', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UamRoutingModule { }
