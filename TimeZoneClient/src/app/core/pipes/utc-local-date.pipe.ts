import { Pipe, PipeTransform } from '@angular/core';
import { TimezoneUtilService } from '../timezone-util.service';

@Pipe({
  name: 'utcToLocalDate',
})
export class UtcToLocalTimePipe implements PipeTransform {
  constructor(private timezoneUtilService: TimezoneUtilService) {}

  transform(date: string, args?: any): string {
    return this.timezoneUtilService.convertUtcToLocalDate(new Date(date)).toLocaleString();
  }
}
