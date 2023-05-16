import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberPledgesRoutingModule } from './member-pledges-routing.module';
import { MemberPledgesDashboardComponent } from './member-pledges-dashboard/member-pledges-dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPayPalModule } from 'ngx-paypal';



@NgModule({
  declarations: [MemberPledgesDashboardComponent],
  imports: [
    CommonModule,
    MemberPledgesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxPayPalModule
   
    

    

  ]
})
export class MemberPledgesModule { }
