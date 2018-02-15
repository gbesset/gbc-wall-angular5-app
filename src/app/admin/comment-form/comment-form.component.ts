import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AdminDataService } from '../../services/admin-data.service';
import { Comment } from '../../contract/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

@Input() comment: Comment;

constructor(private _adminService: AdminDataService,
			private router: Router) { }

  ngOnInit() {
  }


  // La méthode appelée lorsque le formulaire est soumis.
  onSubmit(): void {
    console.log("Submit form !");
    let link = ['/admin/comments']//);, this.comment.id];
    this.router.navigate(link);
  }

}
