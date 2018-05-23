import { Component, OnInit } from '@angular/core';

import { AdminDataService } from '../../../services/admin-data.service';
import { Item } from '../../../contract/item';
import {Comment} from '../../../contract/comment';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

    private page: number=0;
    private totalPages: number=0;
    private items: Array<Item>;
    private pages: Array<number>;

    errorApi: string = '';

    constructor(private _adminService: AdminDataService) { }

    ngOnInit() {
        this.getItems()
    }

    getItems(): void{
        this._adminService.getItems(this.page).subscribe(
            (data) => {
                this.items = data['content'];
                this.totalPages = data['totalPages'];
                this.pages = new Array(this.totalPages);
            },
            (error) => {
                console.log(error.error.message);
            }
        );}

    onPageChange(p, event:any){
        //On annule le comportement par defaut
        event.preventDefault();

        this.page = p;
        this.getItems();
    }

    deleteItem(i: Item){
        console.log("ItemListComponent - delete item id"+i.id);
        this._adminService.deleteItemAPI(i).subscribe(
            (data) => {
                console.log("Suppression de l item "+ i.id);

                this.getItems();
            },
            (error) => {
                console.log("ItemListComponent - deleteItem - Error :" + error.error.message);
            }
        );
    }

}
