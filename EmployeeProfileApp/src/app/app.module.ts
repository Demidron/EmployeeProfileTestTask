import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilesInfoModule } from './profiles-info/profiles-info.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfilesInfoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
