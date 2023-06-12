import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {DATE_PIPE_DEFAULT_OPTIONS} from "@angular/common";
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Import PrimeNG modules
import {CalendarModule} from 'primeng/calendar';
import {AppComponent} from './app.component';
import {UtcToLocalTimePipe} from './core/pipes/utc-local-date.pipe';
import {TimezoneUtilService} from './core/timezone-util.service';

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
  declarations: [AppComponent, UtcToLocalTimePipe],
  bootstrap: [AppComponent],
  providers: [TimezoneUtilService,
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: environment.dateFormat }
    }],
})
export class AppModule {
}
