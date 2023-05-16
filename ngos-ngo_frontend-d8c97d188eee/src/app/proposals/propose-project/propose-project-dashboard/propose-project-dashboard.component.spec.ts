import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeProjectDashboardComponent } from './propose-project-dashboard.component';

describe('ProposeProjectDashboardComponent', () => {
  let component: ProposeProjectDashboardComponent;
  let fixture: ComponentFixture<ProposeProjectDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposeProjectDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeProjectDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
