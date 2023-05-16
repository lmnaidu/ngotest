import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { EditRolesComponent } from './edit-roles/edit-roles.component';


const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: 'rolesList', component: UserRolesComponent },
      { path: 'addRole', component: AddRolesComponent },
      { path: 'editRole/:id', component: EditRolesComponent },
      { path: '', redirectTo: 'rolesList', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UamRoelsRoutingModule { }
