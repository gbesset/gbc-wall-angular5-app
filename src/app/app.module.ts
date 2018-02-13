import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//Forms
import { FormsModule }   from '@angular/forms';

//Module Bootstrap de ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

//Tabs from ngx-bootstrap
import { TabsModule } from 'ngx-bootstrap';

//Components
import { HomeNavbarComponent } from './navbar/home-navbar/home-navbar.component';
import { AppNavbarComponent } from './navbar/app-navbar/app-navbar.component';
import { AdminNavbarComponent } from './navbar/admin-navbar/admin-navbar.component';
import { AdminSubmenuNavbarComponent } from './navbar/admin-submenu-navbar/admin-submenu-navbar.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { WallComponent } from './wall/wall.component';

//Serevices
import { DataService } from './services/data.service';
import { AdminDataService } from './services/admin-data.service';

import { CarouselModule } from 'ngx-bootstrap';
import { ItemListComponent } from './admin/item-list/item-list.component';
import { ItemEditComponent } from './admin/item-edit/item-edit.component';
import { ItemFormComponent } from './admin/item-form/item-form.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeNavbarComponent,
    AppNavbarComponent,
    AdminComponent,
    HomeComponent,
    WallComponent,
    AdminNavbarComponent,
    AdminSubmenuNavbarComponent,
    ItemListComponent,
    ItemEditComponent,
    ItemFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot(),

  ],
  providers: [
    DataService,
    AdminDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
