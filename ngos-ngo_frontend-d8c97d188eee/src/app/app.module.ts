import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module'
import { HttpClientModule } from '@angular/common/http';
import { NgbModule,NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AgmCoreModule} from '@agm/core';
import { NgMarqueeModule } from 'ng-marquee';
import { ToastrModule } from 'ngx-toastr';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { HTTP_INTERCEPTORS } from  '@angular/common/http';
import { ErrorInterceptor } from '././core/services/token-expire.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    NgbNavModule,
    NgxUsefulSwiperModule,
    Ng2SearchPipeModule,
    FormsModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDC_vgeKw4aoYK9HQj_K6pb5diK9m_zyBw'
    }),
    NgMarqueeModule,
    ToastrModule.forRoot(),
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
