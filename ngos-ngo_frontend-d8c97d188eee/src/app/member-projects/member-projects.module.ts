import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberProjectsRoutingModule } from './member-projects-routing.module';
import { MemberProjectsDashboardComponent } from './member-projects-dashboard/member-projects-dashboard.component';
import { NgbModule,NgbNavModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [MemberProjectsDashboardComponent],
  imports: [
    CommonModule,
    MemberProjectsRoutingModule,
    NgbModule,
    NgbNavModule
  ]
})
export class MemberProjectsModule { }
