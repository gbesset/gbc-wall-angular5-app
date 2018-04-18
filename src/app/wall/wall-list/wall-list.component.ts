import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../contract/item';

@Component({
  selector: 'app-wall-list',
  templateUrl: './wall-list.component.html',
  styleUrls: ['./wall-list.component.css']
})
export class WallListComponent implements OnInit {

  @Input() page: number;
  @Input()  items : Item[];
  @Input() pages: Array<number>;

  @Output() pageClick: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

 onPageChange(i, event:any){
 	//On annule le comportement par defaut
 	event.preventDefault();

 	//on emet un evenement pour qu'il soit capté par wall.component
 	this.pageClick.emit(i)
  }

}
