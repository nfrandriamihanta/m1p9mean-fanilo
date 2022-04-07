import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorerProfitComponent } from './restorer-profit.component';

describe('RestorerProfitComponent', () => {
  let component: RestorerProfitComponent;
  let fixture: ComponentFixture<RestorerProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestorerProfitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorerProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
