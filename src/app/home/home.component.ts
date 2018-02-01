import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { DataService } from '../services/data.service';

import { Item } from '../contract/item';
import { Comment } from '../contract/comment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  siteTitle: string = environment.home.title;
  siteDescription: string = environment.home.description;

  carousel: any[];

  pictures: Item[];
  videos: Item[];
  comments: Comment[];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  	this.getCarousel();
    this.getLastPictures();
    this.getLastVideos();
    this.getLastComments();
  }

  getCarousel(): void{
	  this._dataService.getCarousel().subscribe(headerPict => this.carousel = headerPict);
  }

  getLastPictures(): void{
    this._dataService.getLastPictures().subscribe(items => this.pictures = items);
  }
  getLastVideos(): void{
    this._dataService.getLastVideos().subscribe(items => this.videos = items);
  }
  getLastComments(): void{
    this._dataService.getLastComments().subscribe(comments => this.comments = comments);
  }

}
