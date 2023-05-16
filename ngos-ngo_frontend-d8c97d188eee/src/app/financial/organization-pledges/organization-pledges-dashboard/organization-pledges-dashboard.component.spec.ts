import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationPledgesDashboardComponent } from './organization-pledges-dashboard.component';

describe('OrganizationPledgesDashboardComponent', () => {
  let component: OrganizationPledgesDashboardComponent;
  let fixture: ComponentFixture<OrganizationPledgesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationPledgesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationPledgesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
