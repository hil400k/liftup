import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPlanItemComponent } from './custom-plan-item.component';

describe('CustomPlanItemComponent', () => {
  let component: CustomPlanItemComponent;
  let fixture: ComponentFixture<CustomPlanItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPlanItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPlanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
