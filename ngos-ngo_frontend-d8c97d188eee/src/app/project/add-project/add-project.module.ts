import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProjectRoutingModule } from './add-project-routing.module';
import { AddProjectComponent } from './add-project/add-project.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


const ngWizardConfig: NgWizardConfig = {
  theme: THEME.arrows
};


@NgModule({
  declarations: [AddProjectComponent],
  imports: [
    CommonModule,
    AddProjectRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgWizardModule.forRoot(ngWizardConfig),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    VerticalTimelineModule,
    NgMultiSelectDropDownModule

  ]
})
export class AddProjectModule { }
