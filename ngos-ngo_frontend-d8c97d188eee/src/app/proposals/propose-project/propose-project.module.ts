import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProposeProjectRoutingModule } from './propose-project-routing.module';
import { ProposeProjectDashboardComponent } from './propose-project-dashboard/propose-project-dashboard.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [ProposeProjectDashboardComponent],
  imports: [
    CommonModule,
    ProposeProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class ProposeProjectModule { }
