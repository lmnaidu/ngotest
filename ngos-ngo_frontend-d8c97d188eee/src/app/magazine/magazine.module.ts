import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagazineRoutingModule } from './magazine-routing.module';
import { MagazineComponent } from './magazine/magazine.component';
import { FormsModule, NgForm } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MagazineListComponent } from './magazine-list/magazine-list.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewMagazineComponent } from './view-magazine/view-magazine.component';
@NgModule({
  declarations: [MagazineComponent, MagazineListComponent, ViewMagazineComponent],
  imports: [
    CommonModule,
    MagazineRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUsefulSwiperModule,
    NgMultiSelectDropDownModule,
    OwlDateTimeModule, OwlNativeDateTimeModule
  ]
})
export class MagazineModule { }
