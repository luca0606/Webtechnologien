import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { RegistrierungComponent } from './registrierung/registrierung.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StellenportalComponent } from './stellenportal/stellenportal.component';
import { BewerberlisteComponent } from './bewerberliste/bewerberliste.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterComponent } from './components/filter/filter.component';
import { StellenpflegeComponent } from './stellenpflege/stellenpflege.component';
import { StellenComponent } from './stellen/stellen.component';

@NgModule({
  declarations: [
    AppComponent,
    StartseiteComponent,
    AnmeldungComponent,
    RegistrierungComponent,
    StellenportalComponent,
    BewerberlisteComponent,
    HeaderComponent,
    FooterComponent,
    FilterComponent,
    StellenpflegeComponent,
    StellenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
