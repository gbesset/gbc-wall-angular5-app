import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AdminDataService } from '../../services/admin-data.service';
import { Comment } from '../../contract/comment';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.css']
})
export class CommentEditorComponent implements OnInit {

  comment: Comment = null;

  constructor(
  				private route: ActivatedRoute,
  				private _adminService: AdminDataService,
  				private location: Location) { }

  ngOnInit() {
  	let id = +this.route.snapshot.params['id'];
  	//const id = +this.route.snapshot.paramMap.get('id');
  	this._adminService.getCommentId(id).subscribe(comment => this.comment = comment);
  }

  
  goBack(): void {
  	this.location.back();
  }

}
