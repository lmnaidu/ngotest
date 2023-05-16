import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UamRoutingModule } from './uam-routing.module';
import { UsersComponent } from './users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserTypesComponent } from './user-types/user-types.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [UsersComponent, UserTypesComponent],
  imports: [
    CommonModule,
    UamRoutingModule,
    NgbModule,
    ReactiveFormsModule, FormsModule,
    NgMultiSelectDropDownModule,
    Ng2SearchPipeModule
  ]
})
export class UamModule { }
