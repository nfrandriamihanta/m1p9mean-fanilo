import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFoodListComponent } from './customer-food-list.component';

describe('CustomerFoodListComponent', () => {
  let component: CustomerFoodListComponent;
  let fixture: ComponentFixture<CustomerFoodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFoodListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFoodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
