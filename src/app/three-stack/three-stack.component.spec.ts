import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeStackComponent } from './three-stack.component';

describe('ThreeStackComponent', () => {
  let component: ThreeStackComponent;
  let fixture: ComponentFixture<ThreeStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
