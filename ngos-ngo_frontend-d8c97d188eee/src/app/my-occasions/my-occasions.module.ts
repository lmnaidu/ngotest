import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyOccasionsRoutingModule } from './my-occasions-routing.module';
import { MyOccasionsDashboardComponent } from './my-occasions-dashboard/my-occasions-dashboard.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';



@NgModule({
  declarations: [MyOccasionsDashboardComponent],
  imports: [
    CommonModule,
    MyOccasionsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class MyOccasionsModule { }
