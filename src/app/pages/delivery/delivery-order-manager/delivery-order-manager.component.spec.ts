import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderManagerComponent } from './delivery-order-manager.component';

describe('DeliveryOrderManagerComponent', () => {
  let component: DeliveryOrderManagerComponent;
  let fixture: ComponentFixture<DeliveryOrderManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryOrderManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
