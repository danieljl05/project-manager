import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(data) {
    this.set(data['access_token']);
  }

  set(token) {
    localStorage.setItem('token', token);
    this.payload(token);
  }

  get() {
    return localStorage.getItem('token');
  }

  isValid() {
    let valid = false;
    if (this.get()) {
      const payload = this.getPayload();
      if (payload) {
        valid = (Date.now() < (payload['exp'] * 1000));
      }
    }
    return valid;
  }

  payload(token) {
    const payload = token.split('.')[1];
    const decoded = this.decode(payload);
    localStorage.setItem('payload', JSON.stringify(decoded));
    return decoded;
  }

  getPayload() {
    return JSON.parse(localStorage.getItem('payload'));
  }

  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('payload');    
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }
}
