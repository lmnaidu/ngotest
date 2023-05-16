import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPledgesListComponent } from './member-pledges-list.component';

describe('MemberPledgesListComponent', () => {
  let component: MemberPledgesListComponent;
  let fixture: ComponentFixture<MemberPledgesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPledgesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPledgesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
