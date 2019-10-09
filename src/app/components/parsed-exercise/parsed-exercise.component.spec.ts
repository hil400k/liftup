import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsedExerciseComponent } from './parsed-exercise.component';

describe('ParsedExerciseComponent', () => {
  let component: ParsedExerciseComponent;
  let fixture: ComponentFixture<ParsedExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParsedExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParsedExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
