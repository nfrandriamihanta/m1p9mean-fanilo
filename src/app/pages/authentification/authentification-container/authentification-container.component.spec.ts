import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificationContainerComponent } from './authentification-container.component';

describe('AuthentificationContainerComponent', () => {
  let component: AuthentificationContainerComponent;
  let fixture: ComponentFixture<AuthentificationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthentificationContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthentificationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
