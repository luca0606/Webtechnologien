// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components
import { StartseiteComponent } from './startseite/startseite.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { RegistrierungComponent } from './registrierung/registrierung.component';
import { TestComponent } from './testbackend/test/test.component';
import { StellenportalComponent } from './stellenportal/stellenportal.component';
import { BewerberlisteComponent } from './bewerberliste/bewerberliste.component';
import { StellenComponent } from './stellen/stellen.component';
import { StellenpflegeComponent } from './stellenpflege/stellenpflege.component';

// Extras
import { AuthGuard } from './authGuard';

const routes: Routes = [
  { path: 'anmeldung', component: AnmeldungComponent },
  { path: 'registrierung', component: RegistrierungComponent },
  { path: '', component: StartseiteComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
     
      { path: 'stellenportal', component: StellenportalComponent },
      { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
      { path: 'bewerberliste', component: BewerberlisteComponent },
      { path: 'stellenanzeige', component: StellenComponent},
      { path: 'stellenpflege', component: StellenpflegeComponent},

    ]
  }

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
