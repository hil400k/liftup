import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSearchComponent } from './plan-search.component';

describe('PlanSearchComponent', () => {
  let component: PlanSearchComponent;
  let fixture: ComponentFixture<PlanSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
