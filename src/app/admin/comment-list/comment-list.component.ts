import { Component, OnInit } from '@angular/core';

import { AdminDataService } from '../../services/admin-data.service';
import { Comment } from '../../contract/comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  comments: Comment[];
 
  constructor(private _adminService: AdminDataService) { }

  ngOnInit() {
  	this.getComments()
  }

  getComments(): void{
    this._adminService.getAllComments().subscribe(comments => this.comments = comments);
  }

  // On crée une méthode qui s'occupe de la redirection
  /*goEdit(comment: Comment): void {
    let link = ['/admin/comment/edit', comment.id];
    this.router.navigate(link);
  }*/

}
