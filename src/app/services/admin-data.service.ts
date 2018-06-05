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
    private apiAdminResource : string = environment.apiURL.url + environment.apiURL.resource;

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
        console.log("ADMIN SERVICE : ajout de l'item id [" + item.id + "] file "+ item.file + " description: "+ item.description);

        console.log(item);
        if(item.id === undefined) {
            console.log("Post item id: null")
            return this._http.post(this.apiAdminWall + "/item/add", item);
        }
        else{
            console.log("Put on item id: "+ item.id )
            return this._http.put(this.apiAdminWall + "/item/update", item);
        }
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

    deleteItemImageAPI(i: Item){
        console.log("AdminDataService - delete item id" + i.id);

        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this._http.get(this.apiAdminResource+"/delete?id=" + i.id, {headers: headers});

    }

    deleteItemAPI(i: Item){
        console.log("AdminDataService - delete item id" + i.id);

        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this._http.delete(this.apiAdminWall+"/item/delete/" + i.id, {headers: headers});

    }

    uploadFileAPI(file: File, path){
        const data: FormData = new FormData();
        data.append("file", file);
        if(path === undefined){
            //pour evolution upload....
            //return this._http.post(this.apiAdminResource + "/post", data, { reportProgress: true, observe: 'events' });
            return this._http.post(this.apiAdminResource + "/post", data);
        }
        else {
            return this._http.post(this.apiAdminResource + "/post?path=" + path, data);
        }

    }

    rotateImagePI(i: Item, angle: string){
        console.log("AdminDataService - rotate image id" + i.id);

        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this._http.get(this.apiAdminResource+"/rotate?id=" + i.id+"&angle="+angle, {headers: headers});

    }

    deleteCommentsOfItemAPI(id: number | undefined) {
        alert("TODO JAVA");
    }
}
