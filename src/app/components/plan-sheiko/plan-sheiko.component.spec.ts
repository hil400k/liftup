import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheikoPlanComponent } from './plan.component';

describe('PlanComponent', () => {
  let component: SheikoPlanComponent;
  let fixture: ComponentFixture<SheikoPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheikoPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheikoPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
