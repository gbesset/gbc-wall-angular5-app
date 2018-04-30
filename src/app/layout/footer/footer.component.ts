import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  versionAngular: string = environment.versions.angular;
  versionJava: string = environment.versions.java;

  constructor() { }

  ngOnInit() {
  }

}
