import { Injectable } from '@angular/core';

import { Item } from '../contract/item';
import { Comment } from '../contract/comment';

import { MessageService } from './message.service';


import { HOME_CAROUSEL } from '../home.carousel';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { MOCK_ITEMS } from '../mock/mock-items';
import { MOCK_PICTURES } from '../mock/mock-pictures';
import { MOCK_VIDEOS } from '../mock/mock-videos';
import { MOCK_COMMENTS } from '../mock/mock-comments';

@Injectable()
export class DataService {


  private wallUrl = 'api/';
  loading: boolean;

  constructor( private messageService: MessageService) { 
      this.loading =false;
  }


  private log(message: string) {
    this.messageService.add('DataService: ' + message);
  }


  getCarousel(): Observable<any>{
  	return of(HOME_CAROUSEL);
  }

  getLastPictures() :Observable<any>{
    this.messageService.add('DataService -> getLastPicture');
  	return of(MOCK_PICTURES); 	
  }

  getLastComments() :Observable<any>{
    this.messageService.add('DataService -> getLastComments');
  	return of(MOCK_COMMENTS); 	
  }

  getLastVideos() :Observable<any>{
    this.messageService.add('DataService -> getLastVideos');
  	return of(MOCK_VIDEOS); 	
  }
}
