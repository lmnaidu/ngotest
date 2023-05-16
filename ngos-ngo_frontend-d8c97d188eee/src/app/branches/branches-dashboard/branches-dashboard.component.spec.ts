import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesDashboardComponent } from './branches-dashboard.component';

describe('BranchesDashboardComponent', () => {
  let component: BranchesDashboardComponent;
  let fixture: ComponentFixture<BranchesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
