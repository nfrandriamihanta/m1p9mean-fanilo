import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoManagerComponent } from './resto-manager.component';

describe('RestoManagerComponent', () => {
  let component: RestoManagerComponent;
  let fixture: ComponentFixture<RestoManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
