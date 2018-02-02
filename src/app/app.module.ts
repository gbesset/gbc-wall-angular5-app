import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//Module Bootstrap de ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

//Components
import { HomeNavbarComponent } from './navbar/home-navbar/home-navbar.component';
import { AppNavbarComponent } from './navbar/app-navbar/app-navbar.component';
import { AdminNavbarComponent } from './navbar/admin-navbar/admin-navbar.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { WallComponent } from './wall/wall.component';

//Serevices
import { DataService } from './services/data.service';

import { CarouselModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HomeNavbarComponent,
    AppNavbarComponent,
    AdminComponent,
    HomeComponent,
    WallComponent,
    AdminNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot()

  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
