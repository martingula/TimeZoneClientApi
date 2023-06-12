import {Injectable, OnDestroy} from '@angular/core';
import {ProjectModel} from "./core/models/project.model";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {HttpClient} from "@angular/common/http";

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService  implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  insert(item: ProjectModel): Observable<Array<ProjectModel>> {
    return this.http.post<Array<ProjectModel>>(environment.apiUrl + 'Project', item).pipe(
      takeUntil(this.unsubscribe$),
      map(response => {
        console.log(response);
        return response;
      })
    );
  }

  getAll(): Observable<Array<ProjectModel>> {
    return this.http.get<Array<ProjectModel>>(environment.apiUrl + 'Project')
      .pipe(
      takeUntil(this.unsubscribe$),
      map((response: Array<ProjectModel>) => {
        console.log(response);
        return response;
      })
    );
  }

  get(id: number): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(environment.apiUrl + 'Project'+ '/' + id.toString())
      .pipe(
        takeUntil(this.unsubscribe$),
        map((response: ProjectModel) => {
          console.log(response);
          return response;
        })
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
