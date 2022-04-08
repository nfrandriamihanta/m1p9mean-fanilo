import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryManManagerComponent } from './delivery-man-manager.component';

describe('DeliveryManManagerComponent', () => {
  let component: DeliveryManManagerComponent;
  let fixture: ComponentFixture<DeliveryManManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryManManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryManManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
