import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AdminDataService } from '../../../services/admin-data.service';
import { Comment } from '../../../contract/comment';

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
        console.log("CommentFormComponent : Mise a jour du comment ");
        console.log(this.comment)
        this._adminService.updateCommentAPI(this.comment).subscribe(
            (data) => {
                console.log("Mise a jour du comment " + this.comment.id + " OK");
                this.router.navigate(['/admin/comments']);
            },
            (error) => {
                console.log("CommentFormComponent - Update - Error :" + error.error.message);
            }
        );
    }

}
