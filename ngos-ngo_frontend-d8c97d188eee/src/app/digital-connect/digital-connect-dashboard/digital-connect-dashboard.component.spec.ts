import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalConnectDashboardComponent } from './digital-connect-dashboard.component';

describe('DigitalConnectDashboardComponent', () => {
  let component: DigitalConnectDashboardComponent;
  let fixture: ComponentFixture<DigitalConnectDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalConnectDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalConnectDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
