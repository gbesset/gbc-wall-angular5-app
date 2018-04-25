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

  constructor(private _http: HttpClient, private messageService: MessageService) { }

	private log(message: string) {
    this.messageService.add('WallDataService: ' + message);
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
  	this.log(new Date()+ ' : call /items?page='+page);
  	return this._http.get(this.apiWall+'/items?page='+page)
  }

  getComments(page:number){
    this.log(new Date()+ ' : call /commennts?page='+page);
    return this._http.get(this.apiWall+'/comments?page='+page)
  }

}
