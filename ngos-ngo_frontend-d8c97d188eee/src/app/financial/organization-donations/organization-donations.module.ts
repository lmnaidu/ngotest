import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationDonationsRoutingModule } from './organization-donations-routing.module';
import { OrganizationDonationsDashboardComponent } from './organization-donations-dashboard/organization-donations-dashboard.component';


@NgModule({
  declarations: [OrganizationDonationsDashboardComponent],
  imports: [
    CommonModule,
    OrganizationDonationsRoutingModule
  ]
})
export class OrganizationDonationsModule { }
