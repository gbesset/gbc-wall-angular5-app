import { Component, OnInit } from '@angular/core';

import { AdminDataService } from '../../../services/admin-data.service';
import { Comment } from '../../../contract/comment';

@Component({
    selector: 'app-comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

    private page: number=0;
    private totalPages: number=0;
    private comments: Array<Comment>;
    private pages: Array<number>;

    errorApi: string = '';

    constructor(private _adminService: AdminDataService) { }

    ngOnInit() {
        this.getComments()
    }

    getComments(): void{
        this._adminService.getComments(this.page).subscribe(
            (data) => {
                this.comments = data['content'];
                this.totalPages = data['totalPages'];
                this.pages = new Array(this.totalPages);
            },
            (error) => {
                console.log(error.error.message);
            }
        );}

    onPageChange(p, event:any){
        //On annule le comportement par defaut
        event.preventDefault();

        this.page = p;
        this.getComments();
    }

}
