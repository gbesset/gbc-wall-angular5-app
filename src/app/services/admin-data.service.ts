import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//En attendant la qualif ou l'interconnection
import { of } from 'rxjs/observable/of';
import { MOCK_ITEMS } from '../mock/mock-items';
import { MOCK_COMMENTS } from '../mock/mock-comments';

import { Item } from '../contract/item';
import { Comment } from '../contract/comment';

@Injectable()
export class AdminDataService {

  //Prendre dans le fichier de properties.....
  ///https://developer.okta.com/blog/2017/12/04/basic-crud-angular-and-spring-boot
  public API = '//localhost:8080';
  public ADMIN_API = this.API + '/admin';

  constructor() { }

 getAllItems(): Observable<any> {
    //return this.http.get(this.API + '/items');
  	return of(MOCK_ITEMS); 	
  }

  getAllComments(): Observable<any> {
    //return this.http.get(this.API + '/items');
  	return of(MOCK_COMMENTS); 	
  }

   getItemId(id: number): Observable<Item>{
  	return of(MOCK_ITEMS.find(item=>item.id === id)); 	
  }

   getCommentId(id: number): Observable<Comment>{
    return of(MOCK_COMMENTS.find(comment=>comment.id === id));   
  }

}
