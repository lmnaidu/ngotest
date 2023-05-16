import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { EventsRoutingModule } from './events-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, NgForm } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LayoutModule } from '../layout/layout.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { EventComponent } from './event/event.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [ EventComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FormsModule,
    HttpClientModule,
    ImageCropperModule,
    LayoutModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    OwlDateTimeModule, OwlNativeDateTimeModule ,
    NgbModule

  ]
})
export class EventsModule { }
