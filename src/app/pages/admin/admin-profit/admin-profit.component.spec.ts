import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfitComponent } from './admin-profit.component';

describe('AdminProfitComponent', () => {
  let component: AdminProfitComponent;
  let fixture: ComponentFixture<AdminProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
