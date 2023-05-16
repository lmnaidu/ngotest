import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationPledgesRoutingModule } from './organization-pledges-routing.module';
import { OrganizationPledgesDashboardComponent } from './organization-pledges-dashboard/organization-pledges-dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [OrganizationPledgesDashboardComponent],
  imports: [
    CommonModule,
    OrganizationPledgesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ]
})
export class OrganizationPledgesModule { }
