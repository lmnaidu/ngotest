import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDonationsDashboardComponent } from './organization-donations-dashboard.component';

describe('OrganizationDonationsDashboardComponent', () => {
  let component: OrganizationDonationsDashboardComponent;
  let fixture: ComponentFixture<OrganizationDonationsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationDonationsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDonationsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
