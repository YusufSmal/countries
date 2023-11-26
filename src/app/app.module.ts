import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';

// Angular Bootstrap
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from './services/countries.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbPaginationModule, 
    NgbAlertModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    NgbModule,
    MatCardModule,
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
