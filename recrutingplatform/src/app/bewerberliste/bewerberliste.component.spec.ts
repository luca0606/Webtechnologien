import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewerberlisteComponent } from './bewerberliste.component';

describe('BewerberlisteComponent', () => {
  let component: BewerberlisteComponent;
  let fixture: ComponentFixture<BewerberlisteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BewerberlisteComponent]
    });
    fixture = TestBed.createComponent(BewerberlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
