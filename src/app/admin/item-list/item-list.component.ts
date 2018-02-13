import { Component, OnInit } from '@angular/core';

import { AdminDataService } from '../../services/admin-data.service';
import { Item } from '../../contract/item';
import { Comment } from '../../contract/comment';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[];
 
  constructor(private _adminService: AdminDataService) { }

  ngOnInit() {
  	this.getItems()
  }

  getItems(): void{
    this._adminService.getAllItems().subscribe(items => this.items = items);
  }
}
