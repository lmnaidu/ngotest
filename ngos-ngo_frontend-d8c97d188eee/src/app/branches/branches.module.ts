import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesDashboardComponent } from './branches-dashboard/branches-dashboard.component';
import { NgbModule,NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BranchesDashboardComponent],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    NgbModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BranchesModule { }
