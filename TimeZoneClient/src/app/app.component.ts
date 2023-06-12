import { Component } from '@angular/core';

import { TimezoneUtilService } from './core/timezone-util.service';

import { environment } from 'src/environments/environment';
import {AppService} from "./app.service";
import {ProjectModel} from "./core/models/project.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appEnv = environment;

  title = 'TimeZone POC Client';
  timezoneName = '';
  offset = 0;

  calendarLocalDate: Date | null = null;
  calendarLocalToUtcDate: Date | null = null;

  dateAsIsoString = '';
  dateAsLocalString = '';
  dateAsUtcString = '';
  dateAsDateString = '';

  projectStartDate: Date | null = null;
  projectId = '';
  projectName = '';

  // @ts-ignore
  projects$: Observable<Array<ProjectModel>>;


  constructor(private timezoneUtilService: TimezoneUtilService, private appService: AppService) {
    this.offset = timezoneUtilService.getTimeZoneOffset();
    this.timezoneName = timezoneUtilService.getLocalTimeZone();
  }

  dateSelect(selectedDate: Date) {
    this.dateAsIsoString = selectedDate.toISOString();
    this.dateAsLocalString = selectedDate.toLocaleString();
    this.dateAsUtcString = selectedDate.toUTCString();
    this.dateAsDateString = selectedDate.toDateString();

    this.calendarLocalDate = selectedDate;
    this.calendarLocalToUtcDate = this.timezoneUtilService.convertLocalDateToUtc(selectedDate);
  }

  saveProject() {
    let project: ProjectModel = {
      id: this.projectId,
      name: this.projectName,
      startDate: this.projectStartDate ?? new Date()
    };

    this.appService.insert(project)
      .subscribe((response) => {
      console.log(response);
      this.projectId = '';
      this.projectName = '';
      this.projectStartDate = new Date();

      this.projects$ = this.appService.getAll();
    });
  }

  getAllProjects(){
    this.projects$ = this.appService.getAll();
  }
}
