import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Subject } from 'rxjs/Subject';


import { HOME_CAROUSEL } from '../home.carousel';
import { MessageService } from './message.service';

@Injectable()
export class WallDataService {


  //Prendre dans le fichier de properties.....
  ///https://developer.okta.com/blog/2017/12/04/basic-crud-angular-and-spring-boot
  private apiWall : string = environment.apiURL.url + environment.apiURL.wall;

  private isModeSearch = false;
  private searchUrl = '/description';

  constructor(private _http: HttpClient, private messageService: MessageService) { }

	private log(message: string) {
    this.messageService.add('WallDataService: ' + message);
  }


  setDefaultSearch(){
    this.setDescriptionSearch();
  }

  setDescriptionSearch(){
    this.searchUrl = '/desciption';
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
  getItems(page:number){
  	//this.log(new Date()+ ' : call /items?page='+page);
  	return this._http.get(this.apiWall+'/items?page='+page)
  }

  getItemId(id: number){
     return this._http.get(this.apiWall+'/item/'+id)
  }

  getComments(page:number){
    return this._http.get(this.apiWall+'/comments?page='+page)
  }

  search(page: number, searchElem: string){
    return this._http.get(this.apiWall+'/search'+this.searchUrl+'/'+searchElem+'?page='+page) 
  }

  signIn(email: string, pwd: string){
    return this._http.post(this.apiWall+'/login', email);
  }

  signOut(){
    return this._http.get(this.apiWall+'/logout');
  }

  addComment(id:number, author:string, comment:string){
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
