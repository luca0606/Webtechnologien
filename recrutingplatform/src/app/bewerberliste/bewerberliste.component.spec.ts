import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BewerberlisteComponent } from './bewerberliste.component';
import { BewerberlisteService } from '../service/bewerberliste.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

describe('BewerberlisteComponent', () => {
  let component: BewerberlisteComponent;
  let fixture: ComponentFixture<BewerberlisteComponent>;
  let bewerberlisteService: jasmine.SpyObj<BewerberlisteService>;

  beforeEach(async () => {
    const bewerberlisteServiceSpy = jasmine.createSpyObj('BewerberlisteService', [
      'getApplList',
      'setChanges',
      'setMessage',
      'deleteAppl',
      'downloadAppl'
    ]);

    await TestBed.configureTestingModule({
      declarations: [BewerberlisteComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: BewerberlisteService, useValue: bewerberlisteServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BewerberlisteComponent);
    component = fixture.componentInstance;
    bewerberlisteService = TestBed.inject(BewerberlisteService) as jasmine.SpyObj<BewerberlisteService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnInit', () => {
  //   it('should build application list', () => {
  //     const mockApplications = [{}, {}]; // Simplified for brevity
  //     bewerberlisteService.getApplList.and.returnValue(of(mockApplications));
  //     component.ngOnInit();
  //     expect(component.applicationList).toEqual(mockApplications);
  //   });
  // });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from all subscriptions', () => {
      const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('buildApplList', () => {
    // bunlarin icine veri yollamak gerekli. Bos oldugundan hata oluyor.

    it('should set applicationList on success', () => {
      // const mockApplications = [{}, {}];
      const mockApplications = [{ status: 'pending', id: '123' }, { status: 'pending', id: '123']
      bewerberlisteService.getApplList.and.returnValue(of(mockApplications));
      component.buildApplList();
      expect(component.applicationList).toEqual(mockApplications);
    });

    it('should handle error on failure', () => {
      const consoleErrorSpy = spyOn(console, 'error');
      bewerberlisteService.getApplList.and.returnValue(throwError(() => new Error('Error')));
      component.buildApplList();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('statusupdate', () => {
    it('should call setChanges and rebuild application list', async () => {
      const status = 'new status';
      const id = '123';
      bewerberlisteService.setChanges.and.returnValue(Promise.resolve());
      spyOn(component, 'buildApplList');

      await component.statusupdate(status, id);
      expect(bewerberlisteService.setChanges).toHaveBeenCalledWith(status, id);
      expect(component.buildApplList).toHaveBeenCalled();
    });
  });

  describe('messageupdate', () => {
    it('should call setMessage and rebuild application list', async () => {
      const status = 'new message';
      const id = '123';
      bewerberlisteService.setMessage.and.returnValue(Promise.resolve());
      spyOn(component, 'buildApplList');

      await component.messageupdate(status, id);
      expect(bewerberlisteService.setMessage).toHaveBeenCalledWith(status, id);
      expect(component.buildApplList).toHaveBeenCalled();
    });
  });

  describe('appldelete', () => {
    it('should call deleteAppl and rebuild application list', async () => {
      const id = '123';
      bewerberlisteService.deleteAppl.and.returnValue(Promise.resolve());
      spyOn(component, 'buildApplList');

      await component.appldelete(id);
      expect(bewerberlisteService.deleteAppl).toHaveBeenCalledWith(id);
      expect(component.buildApplList).toHaveBeenCalled();
    });
  });

  describe('download', () => {
    it('should call downloadAppl with the correct fileName', async () => {
      const fileName = 'resume.pdf';
      await component.download(fileName);
      expect(bewerberlisteService.downloadAppl).toHaveBeenCalledWith(fileName);
    });
  });
});
