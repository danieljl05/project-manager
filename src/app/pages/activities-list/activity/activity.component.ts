import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  activityid: any;
  activity: any;
  users: any;
  tags: any;
  ready: boolean;

  constructor(
    @Optional() public dialogRef: MatDialogRef<any>,
    private activityService: ActivityService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.activityid = data;
    this.getActivity();
    this.ready = false;
  }

  ngOnInit() {
  }

  getActivity() {
    this.activityService.getActivity(this.activityid).subscribe(response => {
      this.activity = response['activity'];
      this.activity = this.activity[0];
      console.log(this.activity);
      this.ready = true;
      this.users = response['users'];
      this.tags = response['tags'];
    });
  }

  delete() {
    console.log(this.activityid);
    this.activityService.deleteActivity(this.activityid).subscribe((resp) => {
      console.log(resp);
      this.dialogRef.close();
    });
  }

} 
