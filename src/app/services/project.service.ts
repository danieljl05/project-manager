import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public url = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) {

  }

  getProjects() {
    return this.http.get(this.url + 'projects');
  }

  getUsers() {
    return this.http.get(this.url + 'users');
  }

  getUser(idUser) {
    return this.http.get(this.url + 'user/' + idUser);
  }

  getRoles() {
    return this.http.get(this.url + 'roles');
  }
}
