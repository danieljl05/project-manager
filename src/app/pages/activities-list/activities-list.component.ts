import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivityComponent } from './activity/activity.component';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { AddPersonComponent } from 'src/app/components/pages/activities-list/add-person/add-person.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {

  ready: boolean;
  idproject: any;
  projectSelected: any;
  memberList: any[];
  tagList: any;

  todoOriginal: any[];
  doneOriginal: any[];
  checkedOriginal: any[];

  tagsSearch: any;

  todo = [
    // 'Adición y consulta de tags',
    // 'Agregar actividades',
    // 'Agregar comentarios',
    // 'Validar permiso para tarea completada'
  ];

  done = [
    // 'CRUD usuarios',
  ];

  checked = [
    // 'Implementación JSON web token',
    // 'CRUD proyectos',
    // 'CRUD tags',
    // 'Login',
    // 'Registrar empleado',
    // 'Permiso login',
    // 'Vista principal',
    // 'Vista empleado',
    // 'Vista administrador',
  ];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private projectService: ProjectService,
    private activityService: ActivityService
  ) {
    this.ready = false;
    this.route.params.subscribe(params => {
      this.idproject = (params['id'] ? params['id'] : '');
      this.initProject();
    });
  }

  ngOnInit() {
    this.initProject();
  }

  initProject() {
    if (this.idproject != '') {
      this.projectService.getProject(this.idproject).subscribe(data => {
        this.projectSelected = data['project'];
        if (!this.projectSelected) {
          alert('Proyecto inexistente');
          window.close();
        }
        this.ready = true;
      });
      this.projectService.getProjectTags(this.idproject).subscribe(data => {
        this.tagList = data['list'];
      });
      this.initMembers();
      this.getActivities();
    }
  }

  initMembers() {
    this.projectService.getprojectMembers(this.idproject).subscribe(data => {
      this.memberList = data['list'];
      this.ready = true;
    });
  }

  addPerson() {
    let dialogRef = this.dialog.open(AddPersonComponent, {
      data: {
        memberList: this.memberList.map(member => member.iduser)
      },
      height: '500px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(userid => {
      if (userid) {
        this.projectService.addProjectMember(this.idproject, userid).subscribe(resp => {
          let msg = 'El usuario ya se encuentra vinculado al proyecto';
          if (resp['added']) {
            msg = 'Usuario vinculado correctamente';
          }
          this.initMembers();
          setTimeout(() => {
            this._snackBar.open(msg, '', {
              duration: 3000
            });
          }, 300);
        });
      }
    });
  }

  quitPerson(personid) {
    this.projectService.quitPerson(this.idproject, personid).subscribe(resp => {
      let msg = "No fue posible desvincular al usuario debido a que se encontró al menos una actividad vinculada";
      if (resp['deleted']) {
        msg = 'Usuario desvinculado correctamente';
      }
      this.initMembers();
      setTimeout(() => {
        this._snackBar.open(msg, '', {
          duration: 3000
        });
      }, 300);
    });
  }

  manageActivity() {
    let dialogRef = this.dialog.open(ActivityFormComponent, {
      data: {
        idproject: this.idproject,
        employeesList: this.memberList,
        tagList: this.tagList
      },
      height: '95%',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getActivities();
    });
  }

  getActivities() {
    this.activityService.getActivitiesByProjectId(this.idproject).subscribe(response => {
      console.log(response);
      this.todoOriginal = [...response['todo']];
      this.doneOriginal = [...response['done']];
      this.checkedOriginal = [...response['checked']];
      this.todo = [...response['todo']];
      this.done = [...response['done']];
      this.checked = [...response['checked']];
      this.tagsSearch = [...response['tags']];
    });
  }

  filter(tagid) {
    let activities = {};
    this.tagsSearch.forEach(t => {
      if (t['idtag'] == tagid) {
        activities[t['idactivity']] = t['idactivity'];
      }
    });
    let idactivities = Object.values(activities);
    this.todo = this.todoOriginal.filter(a => idactivities.includes(a.idactivity));
    this.done = this.doneOriginal.filter(a => idactivities.includes(a.idactivity));
    this.checked = this.checkedOriginal.filter(a => idactivities.includes(a.idactivity));
  }

  resetFilterTags() {
    this.todo = this.todoOriginal;
    this.done = this.doneOriginal;
    this.checked = this.checkedOriginal;
  }

  seeActivity(item: any) {
    let dialogRef = this.dialog.open(ActivityComponent, {
      data: item
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container.data);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let state = event.container.id.split('-')[3];
      this.updateState(event.previousContainer.data[event.previousIndex]['idactivity'], Number(state));
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  updateState(idactivity, state) {
    state++;
    this.activityService.updateActivitySatate(idactivity, state).subscribe(da => {
      this.getActivities();
    });
  }

  hasMembers() {
    return (this.memberList && this.memberList.length > 0);
  }

  hasTags() {
    return (this.tagList && this.tagList.length > 0);
  }

  isAdmin() {
    const uinfo = JSON.parse(localStorage.getItem('user-info'));
    return uinfo['idrol'] == 1;
  }
}
