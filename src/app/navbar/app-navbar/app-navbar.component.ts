import { Component, OnInit } from '@angular/core';
import { WallDataService } from '../../services/wall-data.service';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private _wallService: WallDataService) { }

  ngOnInit() {
  	this.initForms();
  }

 initForms(){
  	this.searchForm = this.formBuilder.group(
  			{
  				searchElement: ['', Validators.required]
  			}
  		);
  }

 onSubmitForm(){
  	 const formValue = this.searchForm.value;
  	 const searchElement = formValue['searchElement'];
  	 console.log("recherche sur "+searchElement);

  	 this._wallService.search(0,searchElement).subscribe(
  	 	(data) => {
  	 		console.log(data['content']);
  	 		//je pense que c'est la qu'il faut maintenant utilser le subscribeObject....?!
  	 		//ou remonter la liste dans le service comme dans oc-blog.... et pas dans wall.component
  	 	}
  	 	);
  }
}
