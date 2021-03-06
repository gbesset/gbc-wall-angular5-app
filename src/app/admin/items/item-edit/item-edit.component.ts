import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AdminDataService } from '../../../services/admin-data.service';
import { Item } from '../../../contract/item';

@Component({
    selector: 'app-item-edit',
    templateUrl: './item-edit.component.html',
    styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

    itemId: number;
    isCreation: boolean;

    constructor(private route: ActivatedRoute,
                private _adminService: AdminDataService,
                private location: Location
    ) { }

    ngOnInit() {
        this.getItem();
    }

    getItem(): void {
        this.itemId = +this.route.snapshot.paramMap.get('id');

        if(!isNaN(this.itemId)) {
            this.isCreation = false;

        }
        else{
            this.isCreation = true;
        }
    }

    goBack(): void {
        this.location.back();
    }

}
