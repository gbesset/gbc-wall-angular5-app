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

    constructor(private formBuilder: FormBuilder, private _wallService: WallDataService) { }

    ngOnInit() {
        this.initForms();
    }

    initForms(){
        this.searchForm = this.formBuilder.group(
            {
                searchElement: ['', Validators.required],
                searchCriteria: ['item', Validators.required]
            }
        );
    }

    onSubmitForm(){
        this._wallService.clearItems();

        const formValue = this.searchForm.value;
        const searchElement = formValue['searchElement'];
        const searchCriteria = formValue['searchCriteria'];
        switch(searchCriteria){
            case 'item' :
                this._wallService.setDescriptionSearch();
            break;
            case 'comment' :
                this._wallService.setCommentSearch();
            break;
            case 'author' :
                this._wallService.setAuthorSearch();
            break;
        }

        console.log('AppNavbarComponent - onSubmitForm recherche sur: ' + searchElement);


        this._wallService.session.search.isModeSearch = true;
        this._wallService.session.search.searchElement = searchElement;


        this._wallService.searchAPI(0, this._wallService.session.search.searchElement);
        this._wallService.emitWallItemSubject();
    }

    refresh(){
        //TODO mise e place refresh
        alert("TODO");
        //this.router.navigate(["/same/route/path?refresh=1"]);
    }
}
