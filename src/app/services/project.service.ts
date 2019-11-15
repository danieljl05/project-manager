import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public url = 'http://localhost:8000/api/';
  // public url = 'https://project-manager-back.herokuapp.com/api/';

  constructor(private http: HttpClient) { }

  getUrl() {
    return this.url;
  }

  // -------------------------------------------- Project --------------------------------------------

  getProjects() {
    return this.http.get(this.url + 'projects');
  }

  getProject(idProject) {
    return this.http.get(this.url + 'project/' + idProject);
  }

  deleteProject(projectId) {
    return this.http.get(this.url + 'project-delete/' + projectId);
  }

  getprojectMembers(projectId) {
    return this.http.get(this.url + 'project/' + projectId + '/members');
  }

  addProjectMember(projectId, personId) {
    return this.http.get(this.url + 'project/' + projectId + '/member/' + personId + '/add');
  }

  quitPerson(projectId, personId) {
    return this.http.get(this.url + 'project/' + projectId + '/member/' + personId + '/delete');
  }

  getProjectTags(projectId) {
    return this.http.get(this.url + 'project/' + projectId + '/tags');
  }

  // -------------------------------------------- Users --------------------------------------------

  getUsers() {
    return this.http.get(this.url + 'users');
  }

  getUser(idUser) {
    return this.http.get(this.url + 'user/' + idUser);
  }

  deleteUser(userId) {
    return this.http.get(this.url + 'user-delete/' + userId);
  }

  // -------------------------------------------- Tags --------------------------------------------
  getTags(tagId = null) {
    if (tagId > 0) {
      return this.http.get(this.url + 'tags/' + tagId);
    }
    return this.http.get(this.url + 'tags');
  }

  deleteTag(tagId) {
    return this.http.get(this.url + 'tag-delete/' + tagId);
  }

  // ------------------------------------------ Utilities ------------------------------------------
  getRoles() {
    return this.http.get(this.url + 'roles');
  }
}
