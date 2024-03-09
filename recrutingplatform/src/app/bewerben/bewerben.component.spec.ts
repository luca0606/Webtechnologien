import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewerbenComponent } from './bewerben.component';

describe('BewerbenComponent', () => {
  let component: BewerbenComponent;
  let fixture: ComponentFixture<BewerbenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BewerbenComponent]
    });
    fixture = TestBed.createComponent(BewerbenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
