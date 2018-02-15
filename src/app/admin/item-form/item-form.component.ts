import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../../contract/item';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})

export class ItemFormComponent {

  type = {
  	"PICTURE": "",
    "VIDEO": "http://",
    "VIDEO_YOUTUBE": "http://www.youtube.com/embed/",
  	"VIDEO_VIMEO" : "http://player.vimeo.com/video/"
  };

  submitted = false;
  datepickerModel: Date;

  @Input() item: Item;
  
  powers = ['Une liste', 'Deroulant', 'je sais pas', 'A definir?'];

  constructor() { }

  newItem() {
    this.item = new Item();
    this.item.type="PICTURE";
    this.submitted = false;
    //this.item.createdAt = new Date();

    console.log(this.item.createdAt);
}

   setPicture(): void{
    
    if(typeof this.item.id == 'undefined'){
      console.log("new id donc on change le type");
      this.item.type="PICTURE";
    }
  }

  setVideo(): void{
     if(typeof this.item.id == 'undefined'){
        console.log("new id donc on change le type");
        this.item.type="VIDEO";
    }

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
