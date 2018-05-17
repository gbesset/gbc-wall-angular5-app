import { Component, OnInit } from '@angular/core';
import { WallDataService } from '../../services/wall-data.service';
import { Item } from '../../contract/item';
import { Comment } from '../../contract/comment';

import { environment } from '../../../environments/environment';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-wall-list-item-view',
    templateUrl: './wall-list-item-view.component.html',
    styleUrls: ['./wall-list-item-view.component.css']
})
export class WallListItemViewComponent implements OnInit {

    path: string = environment.Wall.imgPath;

    private item: Item;
    private comments: Array<Comment>;
    private nbComment:number = 0;
    errorApi: string = '';

    constructor(private route: ActivatedRoute,
                private _wallService: WallDataService,
                private location: Location) { }

    ngOnInit() {
        this.getItemById();
        if(typeof this.item == "undefined"){
            console.log('error. TODO ?? plutot que ds le getItemById?')
        }
    }

    getItemById(){
        //Créer un item vide temporaire
        this.item = new Item();
        //Recuperer l'item depuis le serveur à partir de son id
        //et le setter au item de la page (cela evitera des bugs et erreurs....)
        const id = +this.route.snapshot.paramMap.get('id');

        //TODO 25min49 routeur recuperer plutot l'emeent en fonction de son id dans le tableau de wallSerice !?!
        //normalement je pense quue je devriap as faire de subscribe mais des then......
        //NON?
        //+id pour caster en number
        //this._wallService.getItemIdAPI(+id).then()
        this._wallService.getItemIdAPI(+id).subscribe(
            (data) => {
                this.item = data['item'];
                this.comments = data['item']['comments'];
                this.nbComment = this.comments.length;
            },
            (error) => {
                //Pas normal ce errorApi ... pas ici. on doit justee traiter error cf video OC
                console.log(error.error.message);
                this.errorApi=`<div id="errorApi" class="row">
                          <div class="col-4">
                            <img src="../assets/images/resources/error-connection.gif" class="rounded float-left">
                          </div>
                          <div class="col-6">
                            <p class>Erreur de récupération de l'élément sur le serveur.</p>
                          </div>
                        </div>`;
            }

        );
    }


    goBack(): void {
        this.location.back();
    }

}
