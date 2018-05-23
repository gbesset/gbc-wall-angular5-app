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
import {Router} from '@angular/router';
import {Headers, RequestOptions} from '@angular/http';

//plus besoin
//import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminDataService {

    private apiWall : string = environment.apiURL.url + environment.apiURL.wall;
    private apiAdminWall : string = environment.apiURL.url + environment.apiURL.admin;


    constructor(private _http: HttpClient, private _router : Router) {

    }


    /* Retrieve information */
    getItems(page:number){
        return this._http.get(this.apiWall + '/items?page=' + page);
    }

    getStats(){
        return this._http.get(this.apiWall + '/count');
    }

    getComments(page: number){
        return this._http.get(this.apiWall + '/comments?page=' + page);
    }

    getItemId(id: number){
        return this._http.get(this.apiWall + '/item/' + id);
    }

    getCommentId(id: number){
        return this._http.get(this.apiWall + '/comment/' + id);
    }


    /* Update Information */
    updateOrSaveItemAPI(item: Item){
        console.log("ajout de l'item id [" + item.id + "] file "+ item.file + " description: "+ item.description);

        console.log(item);
        /*if(item.id !== undefined) {
            this._http.post(this.apiAdminWall + "/item/add", item).subscribe(
                (itemAdded: Item) => {
                    alert("Item added id: "+itemAdded.id);
                    //TODO rediriger......
                },
                (error) => {
                    console.log("AdminDataService - updateOrSaveItemAPI - Error :" + error.error.message);
                }
            );
        }
        else{
            this._http.put(this.apiAdminWall + "/item/update", item).subscribe(
                (itemAdded: Item) => {
                    alert('Item updated');
                    //TODO rediriger
                },
                (error) => {
                    console.log("AdminDataService - updateOrSaveItemAPI - Error :" + error.error.message);
                }
            );
        }*/
    }


    updateCommentAPI(c:Comment){
        console.log("AdminDataService - update comment id" + c.id);

        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        alert(c.author + " - " +c.comment +" -  " +c.createdAt)
        return this._http.put(this.apiAdminWall+"/comment/update", c, {headers: headers});

    }

    /* Delete Information */
    deleteCommentAPI(c:Comment){
        console.log("AdminDataService - delete comment id" + c.id);

        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this._http.delete(this.apiAdminWall+"/comment/delete/" + c.id, {headers: headers});

    }

    deleteItemAPI(i: Item){
        console.log("AdminDataService - delete item id" + i.id);

        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this._http.delete(this.apiAdminWall+"/item/delete/" + i.id, {headers: headers});

    }




}
