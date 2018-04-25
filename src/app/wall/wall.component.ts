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
  private pages: Array<number>;
 
  errorApi: string = '';

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
        this.errorApi=`<div id="errorApi" class="row">
                          <div class="col-4">
                            <img src="../assets/images/resources/error-connection.gif" class="rounded float-left">
                          </div>
                          <div class="col-6">
                            <p class>Erreur de récupération des items sur le serveur.</p>
                          </div>
                        </div>`;
   		}

  	);
  }

  setPage(p:number){
  	this.page=p;
  	this.getItems();
  }

}
