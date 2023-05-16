import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberDonationsRoutingModule } from './member-donations-routing.module';
import { MemberDonationsDashboardComponent } from './member-donations-dashboard/member-donations-dashboard.component';
import { NgbModule,NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [MemberDonationsDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,    
    MemberDonationsRoutingModule,
    NgbModule,
    NgbNavModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPayPalModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
  
    
  ]
})
export class MemberDonationsModule { }
