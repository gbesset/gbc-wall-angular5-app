import { Component, OnInit } from '@angular/core';
import { WallDataService } from '../../services/wall-data.service';
import { Item } from '../../contract/item';
import { Comment } from '../../contract/comment';

import { environment } from '../../../environments/environment';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-wall-list-item-view',
    templateUrl: './wall-list-item-view.component.html',
    styleUrls: ['./wall-list-item-view.component.css']
})
export class WallListItemViewComponent implements OnInit {

    rootImgPath: string = environment.Wall.imgPath;

    item: Item;
    currentItemSubscription: Subscription;

    private comments: Array<Comment>;
    private nbComment = 0;

    errorApi: string = '';

    constructor(private route: ActivatedRoute,
                private _wallService: WallDataService,
                private location: Location) { }

    ngOnInit() {

        // On crée une souscription aux Items
        this.currentItemSubscription = this._wallService.currentItemSubject.subscribe(
            (item: Item) => {
                this.item = item;
                if(item.comments !== undefined) {
                    this.comments = item.comments;
                    this.nbComment = item.comments.length;
                }
            },
            (error) => {
                console.log('WallListItemViewComponent - currentItemSubscription Error : ' + error.error.message);
            }
         );
            // On récupère l'Item
            this.getItemById();

            // On fait emmetre les Items
            this._wallService.emitCurrentItemSubject();
    }

    getItemById() {
        // Recuperer l'item depuis le serveur à partir de son id
        // et le setter au item de la page (cela evitera des bugs et erreurs....)
        const id = +this.route.snapshot.paramMap.get('id');

        this._wallService.getItemIdAPI(+id);
        this._wallService.emitCurrentItemSubject();
    }

    goBack(): void {
        this.location.back();
    }

}
