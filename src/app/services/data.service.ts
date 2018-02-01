import { Injectable } from '@angular/core';

import { HOME_CAROUSEL } from '../home.carousel';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { MOCK_PICTURES } from '../mock/mock-pictures';
import { MOCK_VIDEOS } from '../mock/mock-videos';
import { MOCK_COMMENTS } from '../mock/mock-comments';

@Injectable()
export class DataService {

  constructor() { }

  getCarousel(): Observable<any>{
  	return of(HOME_CAROUSEL);
  }

  getLastPictures() :Observable<any>{
  	return of(MOCK_PICTURES); 	
  }

  getLastComments() :Observable<any>{
  	return of(MOCK_COMMENTS); 	
  }

  getLastVideos() :Observable<any>{
  	return of(MOCK_VIDEOS); 	
  }
}
