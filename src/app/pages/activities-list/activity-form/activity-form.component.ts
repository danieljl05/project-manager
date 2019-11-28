import { Component, OnInit, Inject, Optional, ViewChild, ElementRef } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AddPersonComponent } from 'src/app/components/pages/activities-list/add-person/add-person.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

  activity: any = {};
  employeesList: any[];
  personList: any[];
  tagList: any[];
  idproject;

  @ViewChild("tags") tags: ElementRef;
  @ViewChild("signupForm") signupForm: NgForm;

  constructor(
    private activityService: ActivityService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ActivityFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idproject = data['idproject'];
    if (data['idactivity']) {

    } else {
      this.activity = {
        name: '',
        description: '',
        startdate: '',
        enddate: '',
        order: 0,
        state: 1,
        done: 0
      };
    }
    this.personList = [];
    this.employeesList = data['employeesList'];
    this.tagList = data['tagList'];
  }

  ngOnInit() { }

  save() {
    this.activityService.saveActivity({
      tagsid: this.tags['selectedOptions'].selected.map(item => item.value),
      activity: this.activity,
      personsid: this.personList.map(p => p.iduser),
      projectid: this.idproject
    }).subscribe(dat => {
      this.dialogRef.close();
    });
  }

  addPerson() {
    let dialogRef = this.dialog.open(AddPersonComponent, {
      data: {
        memberList: this.personList.map(p => p.iduser),
        employeesList: this.employeesList
      },
      height: '500px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(userid => {
      if (userid) {
        this.personList.push(
          this.employeesList.find(e => e.iduser == userid)
        );
      }
    });
  }

  quitPerson(userid) {
    this.personList = this.personList.filter(p => p.iduser != userid);
  }

  validActivity() {
    return !(this.signupForm.valid && this.hasPeople());
  }

  hasPeople() {
    return (this.personList && this.personList.length > 0);
  }

  hasTags() {
    return (this.tagList && this.tagList.length > 0);
  }

}
