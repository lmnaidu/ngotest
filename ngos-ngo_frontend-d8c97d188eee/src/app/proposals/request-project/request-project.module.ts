import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RequestProjectRoutingModule } from './request-project-routing.module';
import { RequestProjectDashboardComponent } from './request-project-dashboard/request-project-dashboard.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RequestProjectDashboardComponent],
  imports: [
    CommonModule,
    RequestProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class RequestProjectModule { }
