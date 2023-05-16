import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterOutletComponent } from '../layout/router-outlet/router-outlet.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { NewsListComponent } from './news-list/news-list.component';


const routes: Routes = [
  {
    path: '', component: RouterOutletComponent, children: [
      { path: 'newsList', component: NewsListComponent },
      { path: 'addNews', component: AddNewsComponent },
      { path: '', redirectTo: 'newsList', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
