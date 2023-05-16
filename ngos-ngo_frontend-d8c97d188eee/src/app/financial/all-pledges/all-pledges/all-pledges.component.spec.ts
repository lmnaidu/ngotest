import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPledgesComponent } from './all-pledges.component';

describe('AllPledgesComponent', () => {
  let component: AllPledgesComponent;
  let fixture: ComponentFixture<AllPledgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPledgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPledgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
