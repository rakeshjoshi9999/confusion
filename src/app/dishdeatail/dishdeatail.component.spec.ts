import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishdeatailComponent } from './dishdeatail.component';

describe('DishdeatailComponent', () => {
  let component: DishdeatailComponent;
  let fixture: ComponentFixture<DishdeatailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishdeatailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishdeatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
