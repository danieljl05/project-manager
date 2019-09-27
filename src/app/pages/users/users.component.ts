import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public usersList;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getUsers();
  }

  delete(idUser) {
    this.projectService.deleteUser(idUser).subscribe(data => {
      alert('Usuario eliminado correctamente');
      this.getUsers();
    });
  }

  getUsers() {
    this.projectService.getUsers().subscribe((data) => {
      this.usersList = data['users'];
    });
  }

}
