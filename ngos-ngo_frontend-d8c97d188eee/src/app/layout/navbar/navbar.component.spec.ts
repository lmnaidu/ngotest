import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
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
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit',fakeAsync(()=>{
    component.ngOnInit();
  }));
});
