import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartseiteComponent } from './startseite.component';
import { RouterTestingModule } from '@angular/router/testing'; // Import if using routerLink in your template

describe('StartseiteComponent', () => {
  let component: StartseiteComponent;
  let fixture: ComponentFixture<StartseiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartseiteComponent],
      imports: [RouterTestingModule] // Include this if your component template uses routerLink
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartseiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct heading', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Komm in unser Team!');
  });

  it('should have a link to the Stellenportal', () => {
    const compiled = fixture.debugElement.nativeElement;
    const anchorElement = compiled.querySelector('a');
    expect(anchorElement.getAttribute('routerLink')).toEqual('/anmeldung');
    expect(anchorElement.textContent).toContain('Hier geht es zum Stellenportal!');
  });
});
