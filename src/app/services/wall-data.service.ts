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
import {Comment} from '../contract/comment';

@Injectable()
export class WallDataService {

    private apiWall : string = environment.apiURL.url + environment.apiURL.wall;

    // Pour Wall et Header
    // Empêche l'accès direct au tableau pour controller les manipulations possibles
    private wallItems: Array<Item> = [];
    wallItemSubject = new Subject<any[]>();

    session = {
        hasSession: false,
        pagination : {
            page: 0,
            totalPages: 0,
            noMore: false
        },
        search : {
            isModeSearch: false,
            searchUrl : '/description',
            searchElement: ''
        }
    };

    sessionSubject = new Subject<any>();

    // Pour itemView
    private currentItem: Item = new Item("","","","");
    currentItemSubject = new Subject<Item>();


    constructor(private _http: HttpClient) { }

    emitWallItemSubject() {
        // Observable Emet une copie(slice) du tableau
        this.wallItemSubject.next(this.wallItems.slice());
        this.sessionSubject.next(this.session);
    }

    emitCurrentItemSubject() {
        // Observable Emet une copie(slice) de l'item
        this.currentItemSubject.next(this.currentItem);
    }

    clearItems(){
        this.setDefaultSearch();
        this.session.search.isModeSearch = false;
        this.session.search.searchElement = '';

        this.wallItems = [];

        this.session.pagination.totalPages = 0;
        this.session.pagination.page = 0;
        this.session.pagination.noMore = false;

    }

    setDefaultSearch(){
        this.setDescriptionSearch();
    }

    setDescriptionSearch(){
        this.session.search.searchUrl = '/description';
    }

    setCommentSearch(){
        this.session.search.searchUrl = '/comment';
    }

    setAuthorSearch(){
        this.session.search.searchUrl = '/author';
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
    more(){
       if(this.session.pagination.page < this.session.pagination.totalPages - 1){
               this.session.pagination.page = this.session.pagination.page + 1;
                if(this.session.search.isModeSearch){
                    this.searchAPI(this.session.pagination.page,this.session.search.searchElement);
                }
                else {
                    this.getItemsAPI(this.session.pagination.page);
                }
            }
            else{
                this.session.pagination.noMore = true;
            }
        }

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
                this.session.pagination.page = page;
                this.session.pagination.totalPages = data['totalPages'];

                // Fait emetre le subject à la fin de la manipulation pour que les components qui ont souscrits voient les changements
                this.emitWallItemSubject();
            },
            (error) => {
                console.log("wallDataService - getItems - HTTP("+error.status+") Error :" + error.message);
                this.wallItemSubject.error(error);
            }
        );

    }

    getItemIdAPI(id: number){
        console.log("wallDataService - getItemIdAPI on id:" + id + ".");
        this._http.get(this.apiWall+'/item/'+id).subscribe(
            (data) => {
                this.currentItem = data['item'];
                this.emitCurrentItemSubject();
            },
            (error) => {
                console.log("wallDataService - getItemIdAPI - Error :" + error.error.message);
                this.currentItemSubject.error(error);
            }
        );
    }

    getComments(page:number){
        return this._http.get(this.apiWall+'/comments?page='+page);
    }

    searchAPI(page: number, searchElem: string){
        this._http.get(this.apiWall+'/search/item'+this.session.search.searchUrl+'/'+searchElem+'?page='+page).subscribe(
            (data) => {
                console.log("Result JAVA: on("+this.session.search.searchUrl+")");
                console.log(data)
                if(this.wallItems === undefined || (this.wallItems !== undefined && this.wallItems.length === 0)) {
                    this.wallItems = data['content'];
                }
                else {
                    this.wallItems = this.wallItems.concat(data['content']);
                }
                this.session.pagination.page = page;
                this.session.pagination.totalPages = data['totalPages'];

                // Fait emetre le subject à la fin de la manipulation pour que les components qui ont souscrits voient les changements
                this.emitWallItemSubject();
            },
            (error) => {
                console.log("wallDataService - searchAPI - Error :" + error.error.message);
                this.wallItemSubject.error(error);
            }
        );
    }

    signIn(email: string, pwd: string){
        return this._http.post(this.apiWall+'/login', email);
    }

    signOut(){
        return this._http.get(this.apiWall+'/logout');
    }

    addCommentAPI(comment:Comment){
        console.log("ajout sur le item id " + comment.itemId + " par "+ comment.author + " du comment: "+ comment.comment);

        this._http.post(this.apiWall+"/item/" + comment.itemId + "/comment/add",comment).subscribe(
            (commentAdded: Comment) => {
                this.currentItem.comments.push(commentAdded);
                this.emitCurrentItemSubject();
            },
            (error) => {
                console.log("wallDataService - addCommentAPI - Error :" + error.error.message);
            }
        );
    }

}
