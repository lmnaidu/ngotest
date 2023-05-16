import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigitalConnectRoutingModule } from './digital-connect-routing.module';
import { DigitalConnectDashboardComponent } from './digital-connect-dashboard/digital-connect-dashboard.component';
import { NgbModule,NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [DigitalConnectDashboardComponent],
  imports: [
    CommonModule,
    DigitalConnectRoutingModule,
    NgbModule,
    NgbNavModule
    
  ]
})
export class DigitalConnectModule { }
