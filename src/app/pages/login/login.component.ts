import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public error = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  onSubmit(form: NgForm) {
    this.http.post('http://localhost:8000/api/login', form.value).subscribe(
      data => console.log(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.error;
  }

}
