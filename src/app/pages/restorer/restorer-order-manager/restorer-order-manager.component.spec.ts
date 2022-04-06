import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorerOrderManagerComponent } from './restorer-order-manager.component';

describe('RestorerOrderManagerComponent', () => {
  let component: RestorerOrderManagerComponent;
  let fixture: ComponentFixture<RestorerOrderManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestorerOrderManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorerOrderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
