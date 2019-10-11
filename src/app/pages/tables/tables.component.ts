import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  public msg;
  public form;
  public date;
  public idproject = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    const DateObj = new Date;
    let date = DateObj.getFullYear() + '-' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + DateObj.getDate()).slice(-2);
    this.date = date;
    this.form = {
      name: '',
      startdate: date,
      enddate: '',
      description: '',
      image: 'image'
    };

    this.route.params.subscribe(params => {
      this.idproject = (params['id'] ? params['id'] : '');
    });
  }

  ngOnInit() {
    if (this.idproject != '') {
      this.projectService.getProject(this.idproject).subscribe(data => {
        this.form = data['project'];
      });
    }
  }

  onSubmit() {
    let route = '';
    if (this.form.idproject) {
      route = "/" + this.form.idproject;
    }
    this.http.post('http://localhost:8000/api/project' + route, this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    console.log(error);
  }

  handleResponse(data) {
    this.router.navigateByUrl('/projects');
  }
}
