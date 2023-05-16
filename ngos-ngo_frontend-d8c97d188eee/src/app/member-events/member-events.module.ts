import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberEventsRoutingModule } from './member-events-routing.module';
import { MemberEventsDashboardComponent } from './member-events-dashboard/member-events-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MemberEventsDashboardComponent],
  imports: [
    CommonModule,
    MemberEventsRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class MemberEventsModule { }
