import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  public url = 'http://localhost:8000/api/';
  // public url = 'https://project-manager-back.herokuapp.com/api/';
  constructor(
    private http: HttpClient
  ) { }

  getActivitiesByProjectId(projectId) {
    return this.http.get(this.url + 'project/' + projectId + '/activities');
  }

  updateActivitySatate(idactivity, state) {
    return this.http.get(this.url + 'activity/' + idactivity + '/state/' + state);
  }

  getEmployees() {
    return this.http.get(this.url + 'employees');
  }

  saveActivity(params) {
    console.log(params);
    return this.http.post(this.url + 'activity', params);
  }
} 
