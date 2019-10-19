import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsAddExerciseComponent } from './instructions-add-exercise.component';

describe('InstructionsAddExerciseComponent', () => {
  let component: InstructionsAddExerciseComponent;
  let fixture: ComponentFixture<InstructionsAddExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionsAddExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsAddExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
