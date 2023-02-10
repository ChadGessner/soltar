import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitStacksComponent } from './suit-stacks.component';

describe('SuitStacksComponent', () => {
  let component: SuitStacksComponent;
  let fixture: ComponentFixture<SuitStacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuitStacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitStacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
