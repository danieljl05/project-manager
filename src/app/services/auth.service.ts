import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // public url = 'http://localhost:8000/api/';
  public url = 'https://project-manager-udi.000webhostapp.com/api/';

  constructor(
    private http: HttpClient
  ) { }

  getUrl() {
    return this.url;
  }

  me() {
    return this.http.post(this.url + 'me', {});
  }

  isAdmin() {
    const userInfo = this.getUserInfo();
    return userInfo['idrol'] == 1;
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('user-info'));
  }
}
