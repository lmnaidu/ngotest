import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualDonationsRoutingModule } from './manual-donations-routing.module';
import { AddManualDonationsComponent } from './add-manual-donations/add-manual-donations.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AddManualDonationsComponent],
  imports: [
    CommonModule,
    ManualDonationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule
  ]
})
export class ManualDonationsModule { }
