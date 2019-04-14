import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartgridRowComponent } from './cartgrid-row.component';

describe('CartgridRowComponent', () => {
  let component: CartgridRowComponent;
  let fixture: ComponentFixture<CartgridRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartgridRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartgridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
