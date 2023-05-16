import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualDonationsComponent } from './add-manual-donations.component';

describe('AddManualDonationsComponent', () => {
  let component: AddManualDonationsComponent;
  let fixture: ComponentFixture<AddManualDonationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManualDonationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManualDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
