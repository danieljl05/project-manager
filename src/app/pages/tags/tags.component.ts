import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  public projectId = 0;
  public projectName = '';
  public tagsList = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    // this.route.params.subscribe(params => {
    //   this.projectId = params['id'];
    //   this.getTags();
    // });
  }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    this.projectService.getTags().subscribe((data) => {
      this.tagsList = data['tagsList'];
    });
  }

  delete(tagId) {
    this.projectService.deleteTag(tagId).subscribe(data => {
      alert('Etiqueta eliminada correctamente');
      this.getTags();
    });
  }
}
