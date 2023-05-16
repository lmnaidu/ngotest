import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberPledgesListRoutingModule } from './member-pledges-list-routing.module';
import { MemberPledgesListComponent } from './member-pledges-list/member-pledges-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [MemberPledgesListComponent],
  imports: [
    CommonModule,
    MemberPledgesListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxPayPalModule
  ]
})
export class MemberPledgesListModule { }
