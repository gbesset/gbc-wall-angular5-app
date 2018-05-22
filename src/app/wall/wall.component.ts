import {Component, OnInit, OnDestroy} from '@angular/core';
import {WallDataService} from '../services/wall-data.service';
import { Subscription } from 'rxjs/Subscription';
import {Item} from '../contract/item';

@Component({
    selector: 'app-wall',
    templateUrl: './wall.component.html',
    styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit, OnDestroy {

    items: Array<Item>;
    itemsSubscription: Subscription;

    page: number = 0;
    totalPages: number = 0;
    noMore : boolean = false;
    sessionSubscription: Subscription;

    isError: boolean = false;

    hasSession: boolean = false;

    constructor(private _wallService: WallDataService) { }

    ngOnInit() {
        if(this._wallService.session.hasSession){
            this.  restoreSession();
        }
        else {
            //Initialise le Wall avec les éléments de base
            this._wallService.clearItems();
            // On crée une souscription aux Items
            this.itemsSubscription = this._wallService.wallItemSubject.subscribe(
                (items: any[]) => {
                    this.items = items;
                },
                (error) => {
                    console.log('WallComponent - itemsSubscription error : ' + error.error.message);
                    this.isError = true;
                }
            );

            this.sessionSubscription = this._wallService.sessionSubject.subscribe(
                (pagination: any) => {
                    this.page = pagination.page;
                    this.totalPages = pagination.totalPages;
                    this.noMore = pagination.noMore;
                },
                (error) => {
                    console.log('WallComponent - paginationSubscription error : ' + error.error.message);
                    this.isError = true;
                }
            );
            // On récupère les items
            this.page = 0;
            this.getItems();

            // On fait emmetre les Items
            this._wallService.emitWallItemSubject();
        }
    }

    restoreSession(){
            //alert('restaurer avec page'+this.page);
    }

    ngOnDestroy() {
        this.itemsSubscription.unsubscribe();
        this.sessionSubscription.unsubscribe();
    }

    getItems() {
        this._wallService.getItemsAPI(this.page);
        this._wallService.emitWallItemSubject();
    }


    more(p:number){
        this._wallService.more();
        this._wallService.emitWallItemSubject();
    }

}
