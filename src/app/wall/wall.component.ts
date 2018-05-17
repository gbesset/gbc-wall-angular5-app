import {Component, OnInit, OnDestroy} from '@angular/core';
import {WallDataService} from '../services/wall-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-wall',
    templateUrl: './wall.component.html',
    styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit, OnDestroy {

    items: Array<any>;
    itemsSubscription: Subscription;

    page: number = 0;
    totalPages: number = 0;
    paginationSubscription: Subscription;

    noMoreitems: string = '';

    constructor(private _wallService: WallDataService) { }

    ngOnInit() {
        // On crée une souscription aux Items
        this.itemsSubscription = this._wallService.wallItemSubject.subscribe(
            (items: any[]) => {
                this.items = items;
            },
            (error) => {
                console.log("WallComponent - itemsSubscription error : " + error.error.message);
        );

        this.paginationSubscription = this._wallService.paginationSubject.subscribe(
            (pagination: any) => {
                this.page = pagination.page;
                this.totalPages = pagination.totalPages;
            },
            (error) => {
                console.log("WallComponent - paginationSubscription error : " + error.error.message);
            }
        );
        // On récupère les items
        this.page = 0;
        this.getItems();

        // On fait emmetre les Items
        this._wallService.emitWallItemSubject();
    }

    ngOnDestroy() {
        this.itemsSubscription.unsubscribe();
        this.paginationSubscription.unsubscribe();
    }

    getItems() {
        this._wallService.getItemsAPI(this.page);
        this._wallService.emitWallItemSubject();
    }


    more(p:number){
        if(p < this.totalPages){
            this.page = p + 1;
            this.getItems();
        }
        else{
            this.noMoreitems = `<div>
                            <p>Il n'y a plus d'item à récupérer.....</p>
                          </div>
                        `;
        }
    }

}
