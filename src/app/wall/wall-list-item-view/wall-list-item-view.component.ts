import { Component, OnInit } from '@angular/core';
import { WallDataService } from '../../services/wall-data.service';
import { Item } from '../../contract/item';

import { environment } from '../../../environments/environment';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-wall-list-item-view',
  templateUrl: './wall-list-item-view.component.html',
  styleUrls: ['./wall-list-item-view.component.css']
})
export class WallListItemViewComponent implements OnInit {

  path: string = environment.Wall.imgPath;

  private item: Item;
  private comments: Array<any>;
  errorApi: string = '';

  constructor(private route: ActivatedRoute, 
  				private _wallService: WallDataService,
  				private location: Location) { }

  ngOnInit() {
  	this.getItemById();
  	if(typeof this.item == "undefined"){
  		console.log('error. TODO ?? plutot que ds le getItemById?')
  	}
  }

  getItemById(){
  	const id = +this.route.snapshot.paramMap.get('id');
  	this._wallService.getItemId(id).subscribe(
  		(data) => {
		  this.item = <Item>data['item'];
        },
   		(error) => {
  			console.log(error.error.message);
        	this.errorApi=`<div id="errorApi" class="row">
                          <div class="col-4">
                            <img src="../assets/images/resources/error-connection.gif" class="rounded float-left">
                          </div>
                          <div class="col-6">
                            <p class>Erreur de récupération de l'élément sur le serveur.</p>
                          </div>
                        </div>`;
   		}

  	);
  }

goBack(): void {
  this.location.back();
}

}
