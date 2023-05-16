import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { LayoutModule } from '../layout/layout.module';

import {  ReactiveFormsModule } from '@angular/forms';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProfileInfoComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    LayoutModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ProfileModule { }
