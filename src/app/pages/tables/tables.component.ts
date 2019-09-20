import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  public form;
  public msg;
  public date;

  constructor(
    private http: HttpClient
  ) {
    this.msg = '';
    const DateObj = new Date;
    let date = DateObj.getFullYear() + '-' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + DateObj.getDate()).slice(-2);
    this.date = date;
    this.form = {
      name: '',
      startdate: date,
      image: 'image'
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post('http://localhost:8000/api/project', this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    console.log(error);

  }

  handleResponse(data) {
    let date = this.date;
    this.form = {
      name: '',
      startdate: date,
      image: 'image'
    };
    this.msg = 'Proyecto creado correctamente';
  }

}
