import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOccasionsDashboardComponent } from './my-occasions-dashboard.component';

describe('MyOccasionsDashboardComponent', () => {
  let component: MyOccasionsDashboardComponent;
  let fixture: ComponentFixture<MyOccasionsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOccasionsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOccasionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
