import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsdDetailsComponent } from './usd-details.component';

describe('UsdDetailsComponent', () => {
  let component: UsdDetailsComponent;
  let fixture: ComponentFixture<UsdDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsdDetailsComponent]
    });
    fixture = TestBed.createComponent(UsdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
