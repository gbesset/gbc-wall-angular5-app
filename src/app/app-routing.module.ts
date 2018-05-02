import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WallComponent } from './wall/wall.component';
import { WallListItemViewComponent } from './wall/wall-list-item-view/wall-list-item-view.component';;
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { ItemEditComponent } from './admin/items/item-edit/item-edit.component';
import { ItemListComponent } from './admin/items/item-list/item-list.component';
import { CommentListComponent } from './admin/comments/comment-list/comment-list.component';
import { CommentEditorComponent } from './admin/comments/comment-editor/comment-editor.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { StatsComponent } from './admin/stats/stats.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'wall',
		component: WallComponent
	},
	{
		path: 'wall/:id',
		component: WallListItemViewComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'admin/items',
		component: ItemListComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'admin/item/:id',
		component: ItemEditComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'admin/item/add',
		component: ItemEditComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'admin/comments',
		component: CommentListComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'admin/comment/edit/:id',
		component: CommentEditorComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'admin/stats',
		component: StatsComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
