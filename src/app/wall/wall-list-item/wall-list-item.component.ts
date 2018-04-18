import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../contract/item';

@Component({
  selector: 'app-wall-list-item',
  templateUrl: './wall-list-item.component.html',
  styleUrls: ['./wall-list-item.component.css']
})
export class WallListItemComponent implements OnInit {

  @Input()  item : Item;
  @Input() indexOfPost: number;


  constructor() { }

  ngOnInit() {
  }

}
