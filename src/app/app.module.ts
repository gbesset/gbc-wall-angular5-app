import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//HTTP
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//Forms
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
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
import { WallDataService } from './services/wall-data.service';
import { MessageService } from './services/message.service';
import { AdminDataService } from './services/admin-data.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';


import { CarouselModule } from 'ngx-bootstrap';
import { ItemListComponent } from './admin/items/item-list/item-list.component';
import { ItemEditComponent } from './admin/items/item-edit/item-edit.component';
import { ItemFormComponent } from './admin/items//item-form/item-form.component';
import { CommentListComponent } from './admin/comments/comment-list/comment-list.component';
import { CommentFormComponent } from './admin/comments/comment-form/comment-form.component';
import { CommentEditorComponent } from './admin/comments/comment-editor/comment-editor.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { StatsComponent } from './admin/stats/stats.component';

import { WallListItemComponent } from './wall/wall-list-item/wall-list-item.component';
import { WallListComponent } from './wall/wall-list/wall-list.component';
import { LoginComponent } from './admin/login/login.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';



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
    WallListItemComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    AuthService,
    AdminDataService,
    WallDataService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
