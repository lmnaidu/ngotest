import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllDonationsRoutingModule } from './all-donations-routing.module';
import { AllDonationsComponent } from './all-donations/all-donations.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AllDonationsComponent],
  imports: [
    CommonModule,
    AllDonationsRoutingModule,
    NgbModule
  ]
})
export class AllDonationsModule { }
