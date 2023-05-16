import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestProjectDashboardComponent } from './request-project-dashboard.component';

describe('RequestProjectDashboardComponent', () => {
  let component: RequestProjectDashboardComponent;
  let fixture: ComponentFixture<RequestProjectDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestProjectDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestProjectDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
