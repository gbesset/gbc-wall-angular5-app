import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

//TODO virer?
import { of } from 'rxjs/observable/of';



import { HOME_CAROUSEL } from '../home.carousel';
import {Item} from '../contract/item';


@Injectable()
export class WallDataService {

    private apiWall : string = environment.apiURL.url + environment.apiURL.wall;

    // Empêche l'accès direct au tableau pour controller les manipulations possibles
    private wallItems: Array<Item> = [];
    wallItemSubject = new Subject<any[]>();

    private pagination = {
        page: 0,
        totalPages: 0
    };
    paginationSubject = new Subject<any>();


    private isModeSearch = false;
    private searchUrl = '/description';

    constructor(private _http: HttpClient) { }


    emitWallItemSubject() {
        // Observable Emet une copie(slice) du tableau
        this.wallItemSubject.next(this.wallItems.slice());
        this.paginationSubject.next(this.pagination);
    }


    setDefaultSearch(){
        this.setDescriptionSearch();
    }

    setDescriptionSearch(){
        this.searchUrl = '/description';
    }

    setCommentSearch(){
        this.searchUrl = '/comment';
    }

    setAuthorSearch(){
        this.searchUrl = '/author';
    }


    /****************************     HOME    ******************************/
    getCarousel(): Observable<any>{
        return of(HOME_CAROUSEL);
    }

    getLastPictures(){
        return this._http.get(this.apiWall+'/pictures?page=0&size=10');
    }

    getLastComments(){
        return this._http.get(this.apiWall+'/comments?page=0&size=10');
    }

    getLastVideos(){
        return this._http.get(this.apiWall+'/videos?page=0&size=10');
    }


    /****************************     Wall    ******************************/
    getItemsAPI(page:number){
        console.log("wallDataService - getItems (page=" + page + ")");

        this._http.get(this.apiWall + '/items?page=' + page).subscribe(
            (data) => {
                if(this.wallItems === undefined || (this.wallItems !== undefined && this.wallItems.length === 0)) {
                    this.wallItems = data['content'];
                }
                else{
                    this.wallItems = this.wallItems.concat(data['content']);
                    //this.items.push.apply(this.items, data['content']);
                }
                this.pagination.page = page;
                this.pagination.totalPages = data['totalPages'];

                // Fait emetre le subject à la fin de la manipulation pour que les components qui ont souscrits voient les changements
                this.emitWallItemSubject();
            },
            (error) => {
                console.log("wallDataService - getItems - Error :" + error.error.message);
            }
        );

    }

    getItemIdAPI(id: number){
       /*return new Promise(
            (resolve, reject) => {
                this._http.get(this.apiWall+'/item/'+id);
                return new Item();
            }
        )*/
        return this._http.get(this.apiWall+'/item/'+id);
    }

    getComments(page:number){
        return this._http.get(this.apiWall+'/comments?page='+page);
    }

    search(page: number, searchElem: string){
        return this._http.get(this.apiWall+'/search'+this.searchUrl+'/'+searchElem+'?page='+page);
    }

    signIn(email: string, pwd: string){
        return this._http.post(this.apiWall+'/login', email);
    }

    signOut(){
        return this._http.get(this.apiWall+'/logout');
    }

    addComment(id:number, author:string, comment:string){
        //this._http.post(this.apiWall+/comment);

        /*
        Comment c = Comment{
            "author": author,
            "comment": comment
        }*/

        //this._http.post(this.apiWall+"/item/"+id+"/comment/add",c);

        //TODO
        console.log("ajout sur le item id "+id+ " par "+author+ " du comment: "+comment);
        return new Promise(
            (resolve, reject)=> {
                setTimeout(
                    () => {

                        resolve(true);
                    },2000
                );
            }
        );
    }

}
