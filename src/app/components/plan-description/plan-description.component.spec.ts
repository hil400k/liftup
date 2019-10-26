import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDescriptionComponent } from './plan-description.component';

describe('PlanDescriptionComponent', () => {
  let component: PlanDescriptionComponent;
  let fixture: ComponentFixture<PlanDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
