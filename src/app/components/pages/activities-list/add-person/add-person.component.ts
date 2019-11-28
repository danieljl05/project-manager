import { Component, OnInit, Optional, Inject } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {

  ready: boolean;
  employeesList: any[];
  excludedMembers: any[];

  displayedColumns: string[] = ['name', 'surname', 'email', 'action'];
  dataSource;
  constructor(
    private activityService: ActivityService,
    public dialogRef: MatDialogRef<AddPersonComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ready = false;
    this.excludedMembers = data['memberList'];
    if (data['employeesList']) {
      this.employeesList = data['employeesList'];
    }
  }

  ngOnInit() {
    if (this.employeesList) {
      this.employeesList = this.employeesList.filter((member) => {
        return !(this.excludedMembers.includes(member.iduser));
      });
      this.dataSource = new MatTableDataSource(this.employeesList);
      this.ready = true;
    } else {
      this.activityService.getEmployees().subscribe(data => {
        this.employeesList = data['list'].filter((member) => {
          return !(this.excludedMembers.includes(member.iduser));
        });
        this.dataSource = new MatTableDataSource(this.employeesList);
        this.ready = true;
      });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addMember(iduser) {
    this.dialogRef.close(iduser);
  }
}
