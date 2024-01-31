import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartseiteComponent } from './startseite/startseite.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';


const routes: Routes = [
  { path: '', component: StartseiteComponent },
  { path: 'Anmeldung', component: AnmeldungComponent },
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
