import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class WallDataService {


  //Prendre dans le fichier de properties.....
  ///https://developer.okta.com/blog/2017/12/04/basic-crud-angular-and-spring-boot
  private apiWall : string = environment.apiURL.url + environment.apiURL.wall;

  constructor(private _http: HttpClient) { }

  getItems(page:number){
  	return this._http.get(this.apiWall+'/items?page='+page)
  }

}
