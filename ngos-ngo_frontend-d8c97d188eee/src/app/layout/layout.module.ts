import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TopbarComponent, NavbarComponent, RouterOutletComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  exports:[
    TopbarComponent,
    NavbarComponent,
    RouterOutletComponent
  ]
})
export class LayoutModule { }
