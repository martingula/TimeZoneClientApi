import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {DATE_PIPE_DEFAULT_OPTIONS} from "@angular/common";

// Import PrimeNG modules
import {CalendarModule} from 'primeng/calendar';

import {TimezoneUtilService} from './core/timezone-util.service';

import {AppComponent} from './app.component';
import {AppDatePipe} from "./core/pipes/app-date.pipe";

import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    RouterModule.forRoot([{path: '', component: AppComponent}]),
  ],
  declarations: [AppComponent, AppDatePipe],
  bootstrap: [AppComponent],
  providers: [TimezoneUtilService,
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: environment.dateFormat }
    }],
})
export class AppModule {
}
