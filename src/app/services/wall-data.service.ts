import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class WallDataService {


  //Prendre dans le fichier de properties.....
  ///https://developer.okta.com/blog/2017/12/04/basic-crud-angular-and-spring-boot
  private  API = 'http://localhost:8080';
  private wallUrl = this.API+'/api/wall';

  constructor(private _http: HttpClient) { }

  getItems(page:number){
  	return this._http.get(this.wallUrl+'/items?page='+page)
  }

}
