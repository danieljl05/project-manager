import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public projectsList;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  delete(idProject) {
    this.projectService.deleteProject(idProject).subscribe(data => {
      alert('Proyecto eliminado correctamente');
      this.getProjects();
    });
  }

  getProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projectsList = data['projects'];
    });
  }

  isAdmin() {
    const uinfo = JSON.parse(localStorage.getItem('user-info'));
    return uinfo['idrol'] == 1;
  }
}