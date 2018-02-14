import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../../contract/item';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})

export class ItemFormComponent {

  type = {
  	"youtube": "http://youtube....",
  	"vimeo" : "http://vimeo....."
  };

  submitted = false;

  @Input() item: Item;

  powers = ['Une liste', 'Deroulant', 'je sais pas', 'A definir?'];

  constructor() { }

  newItem() {
  this.item = new Item();
}

  onSubmit() {
  	this.submitted = true;
  }

  onSelect(type: string): void {
  	this.item.path = this.type[type];
}

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.item); }

}
