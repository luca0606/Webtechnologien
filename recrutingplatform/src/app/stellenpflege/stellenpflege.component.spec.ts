import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StellenpflegeComponent } from './stellenpflege.component';

describe('StellenpflegeComponent', () => {
  let component: StellenpflegeComponent;
  let fixture: ComponentFixture<StellenpflegeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StellenpflegeComponent]
    });
    fixture = TestBed.createComponent(StellenpflegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
