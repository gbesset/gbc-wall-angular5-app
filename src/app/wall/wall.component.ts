import { Component, OnInit } from '@angular/core';
import { WallDataService } from '../services/wall-data.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  private page: number=0;
  private items: Array<any>;
  private pages:Array<number>;


  constructor(private _wallService: WallDataService) { }

  ngOnInit() {
  	this.getItems();
  }

  getItems(){
  	this._wallService.getItems(this.page).subscribe(
  		(data) => {
  			this.items = data['content'];
  			this.pages = new Array(data['totalPages']);
  		},
  		(error) => {
  			console.log(error.error.message);
  		}

  	);
  }

  setPage(i, event:any){
  	this.page=i;

  	//prevent the default event action
  	event.preventDefault();

  	this.getItems();
  }

}
