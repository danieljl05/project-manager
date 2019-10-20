import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public error = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  onSubmit(form: NgForm) {
    this.http.post(this.authService.getUrl() + 'login', form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.error;
  }

  handleResponse(data) {
    this.tokenService.handle(data);
    this.router.navigateByUrl('/dashboard');
  }
}
