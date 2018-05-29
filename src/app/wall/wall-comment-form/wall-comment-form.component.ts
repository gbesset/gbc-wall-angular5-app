///<reference path="../../services/wall-data.service.ts"/>
import { Component, OnInit, Input } from '@angular/core';

import { WallDataService } from '../../services/wall-data.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import {Comment} from '../../contract/comment';

@Component({
    selector: 'app-wall-comment-form',
    templateUrl: './wall-comment-form.component.html',
    styleUrls: ['./wall-comment-form.component.css']
})
export class WallCommentFormComponent implements OnInit {

    @Input() itemId;
    commentForm: FormGroup;
    errorMessage: string;

    constructor(private formBuilder:FormBuilder, private _wallService: WallDataService) { }

    ngOnInit() {
        this.initForms();
    }

    initForms(){
        this.commentForm = this.formBuilder.group(
            {
                author: ['', Validators.required],
                comment: ['', Validators.required]
            }
        );
    }
    onSubmitForm(){
        //const formValue = this.commentForm.value;
        //const author = formValue['author'];
        //const comment = formValue['comment'];
        //mieux ?!
        const author = this.commentForm.get('author').value;
        const comment = this.commentForm.get('comment').value;

        const newComment = new Comment(this.itemId, author, comment);

        console.log('WallCommentFormComponent - onSubmitForm ' + newComment.author + ' a ajouté ' + newComment.comment);

        this._wallService.addCommentAPI(newComment);
        this._wallService.emitCurrentItemSubject();
        this.initForms();
    }
}
