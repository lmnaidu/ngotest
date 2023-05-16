import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDonationsDashboardComponent } from './member-donations-dashboard.component';

describe('MemberDonationsDashboardComponent', () => {
  let component: MemberDonationsDashboardComponent;
  let fixture: ComponentFixture<MemberDonationsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDonationsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDonationsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
