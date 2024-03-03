import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { RegistrierungComponent } from './registrierung/registrierung.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './testbackend/test/test.component';
import { StellenportalComponent } from './stellenportal/stellenportal.component';
import { BewerberlisteComponent } from './bewerberliste/bewerberliste.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    StartseiteComponent,
    AnmeldungComponent,
    RegistrierungComponent,
    TestComponent,
    StellenportalComponent,
    BewerberlisteComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
