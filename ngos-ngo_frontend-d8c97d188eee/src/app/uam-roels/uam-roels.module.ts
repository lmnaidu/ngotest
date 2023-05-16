import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UamRoelsRoutingModule } from './uam-roels-routing.module';
import { UserRolesComponent } from './user-roles/user-roles.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { EditRolesComponent } from './edit-roles/edit-roles.component';

@NgModule({
  declarations: [UserRolesComponent, AddRolesComponent, EditRolesComponent],
  imports: [
    CommonModule,
    UamRoelsRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UamRoelsModule { }
