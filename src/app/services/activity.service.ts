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
    return this.http.get(this.url + 'projects/' + projectId + '/activities');
  }

  getEmployees() {
    return this.http.get(this.url + 'employees');
  }
} 
