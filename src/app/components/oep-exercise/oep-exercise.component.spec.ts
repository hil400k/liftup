import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OepExerciseComponent } from './oep-exercise.component';

describe('OepExerciseComponent', () => {
  let component: OepExerciseComponent;
  let fixture: ComponentFixture<OepExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OepExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OepExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
