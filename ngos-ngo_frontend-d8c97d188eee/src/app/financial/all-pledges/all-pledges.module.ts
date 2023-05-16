import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllPledgesRoutingModule } from './all-pledges-routing.module';
import { AllPledgesComponent } from './all-pledges/all-pledges.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AllPledgesComponent],
  imports: [
    CommonModule,
    AllPledgesRoutingModule,
    NgbModule
  ]
})
export class AllPledgesModule { }
