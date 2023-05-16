import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEventsDashboardComponent } from './member-events-dashboard.component';

describe('MemberEventsDashboardComponent', () => {
  let component: MemberEventsDashboardComponent;
  let fixture: ComponentFixture<MemberEventsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEventsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEventsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
