import { Component, OnInit, Input } from '@angular/core';

import { WallDataService } from '../../services/wall-data.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-wall-comment-form',
  templateUrl: './wall-comment-form.component.html',
  styleUrls: ['./wall-comment-form.component.css']
})
export class WallCommentFormComponent implements OnInit {

   @Input() itemId;
   commentForm: FormGroup;

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
  	 const formValue = this.commentForm.value;
  	 const author = formValue['author'];
  	 const comment = formValue['comment'];
  	 console.log(author+" a ajouté "+comment);

  	 this._wallService.addComment(this.itemId,author,comment);
  }

}
