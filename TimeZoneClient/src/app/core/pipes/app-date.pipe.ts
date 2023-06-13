import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

import {TimezoneUtilService} from "../timezone-util.service";
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'appDatePipe',
})
export class AppDatePipe extends DatePipe implements PipeTransform {

  private _defaultDateFormat = 'dd/MM/yyyy hh:mm:ss a';
  private _defaultTimezone = 'America/New_York';
  private _defaultTimezoneOffset = 4;
  private _defaultLocal = 'en-US';

  private env = environment;

  constructor(private timezoneUtilService: TimezoneUtilService) {
    super('en-US');
    this._defaultTimezoneOffset = this.timezoneUtilService.getTimeZoneOffset();
    this._defaultTimezone = this.timezoneUtilService.getLocalTimeZone();
    this._defaultDateFormat = this.env.dateFormat;
  }

  override transform(
    value: Date|string|number,
    format?: string,
    timezone?: string,
    locale?: string): string|null;
  override transform(
    value: null|undefined,
    format?: string,
    timezone?: string,
    locale?: string): null;
  override transform(
    value: Date|string|number|null|undefined,
    format?: string,
    timezone?: string,
    locale?: string): string|null;
  override transform(
    value: Date|string|number|null|undefined,
    format?: string,
    timezone?: string,
    locale?: string): string|null {
    if (value == null || value === '' || value !== value) return null;

    if(format === undefined ||format === null || format === '') {
      format = this._defaultDateFormat;
    }

    if(timezone === undefined ||timezone === null || timezone === '') {
      timezone = this._defaultTimezone;
    }

    if(locale === undefined ||locale === null || locale === '') {
      locale = this._defaultLocal;
    }

    let date = super.transform(value, format, timezone, locale);
    date += ' ' + new Date()
      .toLocaleTimeString(locale,{timeZoneName:'short'})
      .split(' ')[2];

    return date || null;
  }
}

