import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderManagerComponent } from './admin-order-manager.component';

describe('AdminOrderManagerComponent', () => {
  let component: AdminOrderManagerComponent;
  let fixture: ComponentFixture<AdminOrderManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
