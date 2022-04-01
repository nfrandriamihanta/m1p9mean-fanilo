import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRestoListComponent } from './customer-resto-list.component';

describe('CustomerRestoListComponent', () => {
  let component: CustomerRestoListComponent;
  let fixture: ComponentFixture<CustomerRestoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRestoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRestoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
