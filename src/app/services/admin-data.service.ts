import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Subject } from 'rxjs/Subject';

//import { MOCK_ITEMS } from '../mock/mock-items';
//import { MOCK_COMMENTS } from '../mock/mock-comments';

import { Item } from '../contract/item';
import { Comment } from '../contract/comment';
import { Stats } from '../contract/stats';

//plus besoin
//import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminDataService {

    private apiWall : string = environment.apiURL.url + environment.apiURL.wall;
    private apiAdminWall : string = environment.apiURL.url + environment.apiURL.admin;


    constructor(private _http: HttpClient) {

    }


    /* Retrieve information */
    getItems(page:number){
        return this._http.get(this.apiWall+'/items?page='+page)
    }

    getStats(){
        return this._http.get(this.apiWall+'/count')
    }

    getComments(page: number){
        return this._http.get(this.apiWall+'/comments?page='+page)
    }

    getItemId(id: number){
        return this._http.get(this.apiWall+'/item/'+id)
    }

    getCommentId(id: number){
        return this._http.get(this.apiWall+'/comment/'+id)
    }


    /* Update Information */

}
