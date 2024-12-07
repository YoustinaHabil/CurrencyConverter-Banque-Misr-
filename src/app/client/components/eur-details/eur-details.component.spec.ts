import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EurDetailsComponent } from './eur-details.component';

describe('EurDetailsComponent', () => {
  let component: EurDetailsComponent;
  let fixture: ComponentFixture<EurDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EurDetailsComponent]
    });
    fixture = TestBed.createComponent(EurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
