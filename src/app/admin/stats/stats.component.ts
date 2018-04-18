import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminDataService } from '../../services/admin-data.service';
import { Subscription } from 'rxjs/Subscription';

import { Stats } from '../../contract/stats';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  adminSubscription: Subscription;

  private loading: boolean = false;
  private results: Stats;

  constructor(private _adminService: AdminDataService) { }

  ngOnInit() {
  	this.getStats();
  }

  getStats(){
  	this.loading = true;
  	this.adminSubscription = this._adminService.getStats().subscribe( 
        (data) => {
  					this.loading = false;
  					this.results = data;
  				}
       );
  }

  ngOnDestroy() {
    //this.adminSubscription.unsubscribe();
  }

  getNbPicture(): string{
    return 'youhou';
  }

}
