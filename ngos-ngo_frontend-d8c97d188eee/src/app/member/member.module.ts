import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member/member.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {GenerateCertificateComponent} from './generate-certificate/generate-certificate.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditUsersComponent } from './edit-users/edit-users.component';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.arrows
};

@NgModule({
  declarations: [MemberComponent, GenerateCertificateComponent, EditUsersComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgWizardModule.forRoot(ngWizardConfig),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ImageCropperModule,
    NgMultiSelectDropDownModule
  ]
})
export class MemberModule { }
