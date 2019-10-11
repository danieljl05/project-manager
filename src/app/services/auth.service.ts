import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = 'http://localhost:8000/api/';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  verify() {
    // const tokenPayload = this.tokenService.getPayload();
    // const userId = tokenPayload['sub'];
    return this.http.post(this.url + 'me', {});
  }

}
