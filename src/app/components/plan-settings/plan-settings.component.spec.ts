import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSettingsComponent } from './plan-settings.component';

describe('PlanSettingsComponent', () => {
  let component: PlanSettingsComponent;
  let fixture: ComponentFixture<PlanSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
