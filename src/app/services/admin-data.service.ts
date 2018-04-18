import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//En attendant la qualif ou l'interconnection
import { of } from 'rxjs/observable/of';
import { MOCK_ITEMS } from '../mock/mock-items';
import { MOCK_COMMENTS } from '../mock/mock-comments';

import { Item } from '../contract/item';
import { Comment } from '../contract/comment';
import { Stats } from '../contract/stats';

//plus besoin
//import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminDataService {

  //Prendre dans le fichier de properties.....
  ///https://developer.okta.com/blog/2017/12/04/basic-crud-angular-and-spring-boot
  public API = 'http://localhost:8080';
  public ADMIN_API = this.API + '/api/wall';

  results: Object[];
  loading: boolean;

  constructor(private http: HttpClient) { 
      this.results=[];
      this.loading = false;
  }

/*
Problème : fonction ne retourne rien. pas ossible accéder élément. utiliser dans cette classe le results...
  getStats(){
    let promise = new Promise((resolve, reject) =>{

     console.log("[AdminDAtaService] GET Stats as a promise");
     let url = `${this.ADMIN_API}/count`;
    
      this.http.get(url)
        .toPromise()
        .then(res => {
                console.log("resultat requete: ");
                console.log(res.json());
                this.results = res.json().results;
                resolve();
              },
              msg => {
                reject();
              }
          );
    });
    return promise;    
  }
  */

  getStats(): Observable<Stats>{

     let url = `${this.ADMIN_API}/count`;
    
      //res est une Response object. 
      return this.http.get(url).map( res => {
             console.log('admin json');
             console.log(res);
              let results = <Stats>res;
              return results;
          });       
  }


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
