import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProjectsDashboardComponent } from './member-projects-dashboard.component';

describe('MemberProjectsDashboardComponent', () => {
  let component: MemberProjectsDashboardComponent;
  let fixture: ComponentFixture<MemberProjectsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberProjectsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProjectsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
