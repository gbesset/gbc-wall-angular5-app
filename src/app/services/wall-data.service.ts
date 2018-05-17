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

import {Subscription} from 'rxjs/Subscription';


@Injectable()
export class WallDataService {

    private apiWall : string = environment.apiURL.url + environment.apiURL.wall;

    // Pour Wall et Header
    // Empêche l'accès direct au tableau pour controller les manipulations possibles
    private wallItems: Array<Item> = [];
    wallItemSubject = new Subject<any[]>();

    private pagination = {
        page: 0,
        totalPages: 0,
        noMore: false
    };
    paginationSubject = new Subject<any>();

    // Pour itemView
    private currentItem: Item = new Item();
    currentItemSubject = new Subject<Item>();

    isModeSearch :boolean = false;
    searchElement: string = '';
    private searchUrl = '/description';

    constructor(private _http: HttpClient) { }


    emitWallItemSubject() {
        // Observable Emet une copie(slice) du tableau
        this.wallItemSubject.next(this.wallItems.slice());
        this.paginationSubject.next(this.pagination);
    }

    emitCurrentItemSubject() {
        // Observable Emet une copie(slice) de l'item
        this.currentItemSubject.next(this.currentItem);
    }

    clearItems(){
        this.isModeSearch = false;
        this.searchElement = '';
        this.wallItems = [];
        this.pagination.totalPages = 0;
        this.pagination.page = 0;
        this.pagination.noMore = false;
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
    more(){
       if(this.pagination.page < this.pagination.totalPages - 1){
               this.pagination.page = this.pagination.page + 1;
                if(this.isModeSearch){
                    this.searchAPI(this.pagination.page,this.searchElement);
                }
                else {
                    this.getItemsAPI(this.pagination.page);
                }
            }
            else{
                this.pagination.noMore = true;
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
        console.log("wallDataService - getItemIdAPI on id:" + id + ".");
        this._http.get(this.apiWall+'/item/'+id).subscribe(
            (data) => {
                this.currentItem = data['item'];
                this.emitCurrentItemSubject();
            },
            (error) => {
                console.log("wallDataService - getItemIdAPI - Error :" + error.error.message);
            }
        );
    }

    getComments(page:number){
        return this._http.get(this.apiWall+'/comments?page='+page);
    }

    searchAPI(page: number, searchElem: string){
        this._http.get(this.apiWall+'/search'+this.searchUrl+'/'+searchElem+'?page='+page).subscribe(
            (data) => {
                console.log(data['content']);
                this.wallItems = data['content'];
                this.pagination.page = page;
                this.pagination.totalPages = data['totalPages'];
                alert("nb it" + this.wallItems.length+"page "+this.pagination.page+" sur "+this.pagination.totalPages)

                // Fait emetre le subject à la fin de la manipulation pour que les components qui ont souscrits voient les changements
                this.emitWallItemSubject();
            }
        );
        console.log("netoyer le formulaire et rafrachir les comments");
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
