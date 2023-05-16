import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { MagazineComponent } from './magazine/magazine.component';
import { MagazineListComponent } from './magazine-list/magazine-list.component';
import { ViewMagazineComponent } from './view-magazine/view-magazine.component';


const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: 'magazine', component: MagazineComponent },
      { path: 'magazine-list', component: MagazineListComponent },
      { path: 'view-magazine/:id', component: ViewMagazineComponent },
      { path: '', redirectTo: 'magazine', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagazineRoutingModule { }
