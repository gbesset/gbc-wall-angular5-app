import { Component, OnInit } from '@angular/core';
import { WallDataService } from '../services/wall-data.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  private page: number=0;
  private totalPages: number=0;
  private items: Array<any>;
  private pages: Array<number>;
 
  errorApi: string = '';
  noMoreitems: string = '';

  constructor(private _wallService: WallDataService) { }

  ngOnInit() {
  	this.getItems();
  }

  getItems(){
  	this._wallService.getItems(this.page).subscribe(
  		(data) => {
        if(this.items == undefined){
  			  this.items = data['content'];
        }
        else{
         this.items = this.items.concat(data['content']);
         //this.items.push.apply(this.items, data['content']); 
        }
        this.totalPages = data['totalPages'];
  			this.pages = new Array(this.totalPages);
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

 more(p:number){
    if(p < this.totalPages){
      this.page=p+1;
      this.getItems();
    }
    else{
      this.noMoreitems = `<div>
                            <p>Il n'y a plus d'item à récupérer.....</p>
                          </div>
                        `;
    }
  }

}
