import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartgridComponent } from './cartgrid.component';

describe('CartgridComponent', () => {
  let component: CartgridComponent;
  let fixture: ComponentFixture<CartgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
