import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//HTTP
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//Forms
import { FormsModule }   from '@angular/forms';
//DatePicker
import { BsDatepickerModule } from 'ngx-bootstrap';

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

//Services
import { MessageService } from './services/message.service';
import { DataService } from './services/data.service';
import { AdminDataService } from './services/admin-data.service';

import { CarouselModule } from 'ngx-bootstrap';
import { ItemListComponent } from './admin/item-list/item-list.component';
import { ItemEditComponent } from './admin/item-edit/item-edit.component';
import { ItemFormComponent } from './admin/item-form/item-form.component';
import { CommentListComponent } from './admin/comment-list/comment-list.component';
import { CommentFormComponent } from './admin/comment-form/comment-form.component';
import { CommentEditorComponent } from './admin/comment-editor/comment-editor.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { StatsComponent } from './admin/stats/stats.component';
import { WallDataService } from './services/wall-data.service';
import { WallListItemComponent } from './wall/wall-list-item/wall-list-item.component';
import { WallListComponent } from './wall/wall-list/wall-list.component';



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
    ItemFormComponent,
    CommentListComponent,
    CommentFormComponent,
    CommentEditorComponent,
    PageNotFoundComponent,
    MessagesComponent,
    StatsComponent,
    WallListComponent,
    WallListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    MessageService,
    DataService,
    AdminDataService,
    WallDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
