import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartseiteComponent } from './startseite/startseite.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { RegistrierungComponent } from './registrierung/registrierung.component';
import { TestComponent } from './testbackend/test/test.component';


const routes: Routes = [
  { path: '', component: StartseiteComponent },
  { path: 'anmeldung', component: AnmeldungComponent },
  { path: 'registrierung', component: RegistrierungComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
