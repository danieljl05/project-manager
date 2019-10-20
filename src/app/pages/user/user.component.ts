import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public idUser;
  public rolList = [];
  public user = {};

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.route.params.subscribe(params => {
      this.idUser = params['id'];
      this.getUser();
    });
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.projectService.getRoles().subscribe((data) => {
      this.rolList = data['roles'];
      this.projectService.getUser(this.idUser).subscribe((resp) => {
        this.user = resp['user'];
      });
    });
  }

  onSubmit() {
    const data = this.user;
    console.log(data);
    this.http.post(this.projectService.getUrl() + 'update', data).subscribe(
      data => this.handleData(data),
      error => console.log(error)
    );
  }

  handleData(data) {
    this.router.navigateByUrl('/users');
  }
}