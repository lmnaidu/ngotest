import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NewsRoutingModule } from './news-routing.module';
import { AddNewsComponent } from './add-news/add-news.component';
import { NewsListComponent } from './news-list/news-list.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';

import { ImageCropperModule } from 'ngx-image-cropper';
import { LayoutModule } from '../layout/layout.module';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddNewsComponent, NewsListComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgbModule
  ]
})
export class NewsModule { }
