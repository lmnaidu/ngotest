import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { MemberComponent } from './member/member.component';
import { GenerateCertificateComponent } from './generate-certificate/generate-certificate.component';
import { EditUsersComponent } from './edit-users/edit-users.component';

const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: '', component: MemberComponent },
      { path: 'generate-certficate', component: GenerateCertificateComponent },
      { path: 'editUser/:id', component: EditUsersComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
