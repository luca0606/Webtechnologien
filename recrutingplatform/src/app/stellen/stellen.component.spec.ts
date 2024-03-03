import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StellenComponent } from './stellen.component';

describe('StellenComponent', () => {
  let component: StellenComponent;
  let fixture: ComponentFixture<StellenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StellenComponent]
    });
    fixture = TestBed.createComponent(StellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
