import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorCompanyComponent } from './sponsor-company.component';

describe('SponsorCompanyComponent', () => {
  let component: SponsorCompanyComponent;
  let fixture: ComponentFixture<SponsorCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
