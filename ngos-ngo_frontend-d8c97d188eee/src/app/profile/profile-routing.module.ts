import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';


const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: 'profile-info', component: ProfileInfoComponent },
      { path: '', redirectTo: 'profile-info', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
