import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  public tag = {};
  public tagId = 0;
  public projectsList = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.route.params.subscribe(params => {
      this.tagId = params['id'];
      this.getTag();
    });
  }

  ngOnInit() {
    this.getTag();
  }

  getTag() {
    this.projectService.getProjects().subscribe((data) => {
      this.projectsList = data['projects'];
      this.projectService.getTags(this.tagId).subscribe(resp => {
        if (this.tagId > 0) {
          this.tag = resp['tag'];
        }
      });
    });
  }

  onSubmit() {
    if (!this.tag['idproject']) {
      this.tag['idproject'] = this.projectsList[0]['idproject'];
    }
    const data = this.tag;
    this.http.post('http://localhost:8000/api/tag', data).subscribe(
      data => this.handleData(data),
      error => console.log(error)
    );
  }

  handleData(data) {
    this.router.navigateByUrl('/tags');
  }
}
