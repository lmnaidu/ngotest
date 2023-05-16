import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { EventComponent } from './event/event.component';



const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: 'events', component: EventComponent },
      { path: '', redirectTo: 'events', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
