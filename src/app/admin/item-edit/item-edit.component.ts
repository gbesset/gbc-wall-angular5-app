import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AdminDataService } from '../../services/admin-data.service';
import { Item } from '../../contract/item';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  item: Item;

  constructor(private route: ActivatedRoute,
  				private _adminService: AdminDataService,
  				private location: Location
  				) { }

  ngOnInit() {
  	this.getItem();
  	if(typeof this.item == "undefined"){
  		this.item = new Item();
  	}

  }

  getItem(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this._adminService.getItemId(id)
    .subscribe(item => this.item = item);
}

goBack(): void {
  this.location.back();
}

}
