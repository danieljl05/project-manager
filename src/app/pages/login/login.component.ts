import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public error = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  onSubmit(form: NgForm) {
    this.http.post('http://localhost:8000/api/login', form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.error;
  }

  handleResponse(data) {
    this.router.navigateByUrl('/dashboard');
  }

}