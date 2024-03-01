import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartseiteComponent } from './startseite/startseite.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { RegistrierungComponent } from './registrierung/registrierung.component';
import { TestComponent } from './testbackend/test/test.component';
import { StellenportalComponent } from './stellenportal/stellenportal.component';
import { BewerberlisteComponent } from './bewerberliste/bewerberliste.component';


const routes: Routes = [
  { path: '', component: StartseiteComponent },
  { path: 'anmeldung', component: AnmeldungComponent },
  { path: 'registrierung', component: RegistrierungComponent },
  { path: 'stellenportal', component: StellenportalComponent},
  { path: 'test', component: TestComponent },
  { path: 'bewerberliste', component: BewerberlisteComponent}
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
