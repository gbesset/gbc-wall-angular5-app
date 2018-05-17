import { Injectable } from '@angular/core';
import { WallDataService } from './wall-data.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthService {

    isAuth = false;

    constructor(private _wallService : WallDataService) { }

    // Methode asynchrone en utilisant une Promise
    signIn(email: string, pwd: string){
        return new Promise(
            (resolve, reject) => {
                this._wallService.signIn(email, pwd).subscribe(
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

