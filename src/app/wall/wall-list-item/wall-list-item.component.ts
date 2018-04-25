import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../contract/item';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-wall-list-item',
  templateUrl: './wall-list-item.component.html',
  styleUrls: ['./wall-list-item.component.css']
})
export class WallListItemComponent implements OnInit {


  path: string = environment.Wall.imgPath;

  @Input()  item : Item;
  @Input() indexOfPost: number;


  constructor() { }

  ngOnInit() {
  }

}
