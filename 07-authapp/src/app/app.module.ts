import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import the module from the auth0 SDK
import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';
import { PreciosComponent } from './components/precios/precios.component';
import { AuthButtonComponent } from './components/auth-button-component/auth-button-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProtegidaComponent,
    PreciosComponent,
    AuthButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'darthleonard.auth0.com',
      clientId: 'wPG0XKZ6tIOAuSmc0BnxLCpjeSb7pQyY'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
