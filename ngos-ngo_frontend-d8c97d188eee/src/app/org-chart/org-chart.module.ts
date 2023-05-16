import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgChartRoutingModule } from './org-chart-routing.module';
import { OrgchartComponent } from './orgchart/orgchart.component';

import { LayoutModule } from '../layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [OrgchartComponent],
  imports: [
    CommonModule,
    OrgChartRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ]
})
export class OrgChartModule { }
