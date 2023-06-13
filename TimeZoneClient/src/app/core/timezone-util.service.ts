import { Injectable } from '@angular/core';
import subHours from 'date-fns/subHours'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

@Injectable({
  providedIn: 'root',
})
export class TimezoneUtilService {
  private date = new Date();
  private localTimeZone = 'America/New_York';

  constructor() {
    this.localTimeZone = this.getLocalTimeZone();
  }

  getLocalTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  getTimeZoneOffset(): number {
    let utcDate = new Date(
      this.date.toLocaleString('en-US', { timeZone: 'UTC' })
    );

    let localTimeZoneDate = new Date(
      this.date.toLocaleString('en-US', { timeZone: this.localTimeZone })
    );

    let offset = utcDate.getTime() - localTimeZoneDate.getTime();
    return offset / 3600000;
  }

  convertUtcToLocalDate(date: Date): Date {
    return zonedTimeToUtc(date, this.localTimeZone);
  }

  convertLocalDateToUtc(date: Date) {
    return utcToZonedTime(date, 'UTC');
  }

  subHours(date: Date, amount: number) {
    return subHours(date, amount);
  }
}
