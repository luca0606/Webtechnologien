import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StellenportalComponent } from './stellenportal.component';

describe('StellenportalComponent', () => {
  let component: StellenportalComponent;
  let fixture: ComponentFixture<StellenportalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StellenportalComponent]
    });
    fixture = TestBed.createComponent(StellenportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
