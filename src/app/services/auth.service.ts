import { Injectable } from '@angular/core';
import { WallDataService } from './wall-data.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthService {

  isAuth = false;

  constructor(private _wallService : WallDataService) { }

  signIn(){
    return new Promise(
        (resolve, reject) => {
          this._wallService.signIn().subscribe(
              (data) => {
                if(data['status'] === "connected"){
                    this.isAuth = true;
                    resolve(true);
                }
              },
              (error)=> {
                 console.log(error);
              }
            );
       }
    );
  }

  signOut(){
  	this.isAuth = false;
  }
}

