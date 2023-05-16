import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SponsorCompanyRoutingModule } from './sponsor-company-routing.module';
import { SponsorCompanyComponent } from './sponsor-company/sponsor-company.component';
import { RouterOutletComponent } from '../../layout/router-outlet/router-outlet.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';



@NgModule({
  declarations: [SponsorCompanyComponent],
  imports: [
    CommonModule,
    SponsorCompanyRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,


  ]
})
export class SponsorCompanyModule { }
