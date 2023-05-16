import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListComponent } from './news-list.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { LocationStub } from 'src/app/mocks/LocationStub';

import { ImageCropperModule } from 'ngx-image-cropper';
import { LayoutModule } from 'src/app/layout/layout.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { map } from 'rxjs/operators';


describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListComponent ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub }
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        LayoutModule,
        ReactiveFormsModule,
        ImageCropperModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
