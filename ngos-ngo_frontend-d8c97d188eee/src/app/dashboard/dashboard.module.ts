import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';

import { LayoutModule } from '../layout/layout.module';

import { NgMarqueeModule } from 'ng-marquee';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { OrgInfoComponent } from './org-info/org-info.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [HomeComponent, OrgInfoComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    NgMarqueeModule,
    HttpClientModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ]
})
export class DashboardModule { }
