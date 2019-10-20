import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public error = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private token: TokenService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let data = form.value;
    data.idrol = 2;
    data.avatar = "avatar";
    this.http.post(this.authService.getUrl() + 'signin', data).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  handleResponse(data) {
    this.token.handle(data);
    this.router.navigateByUrl('/dashboard');
  }
}
