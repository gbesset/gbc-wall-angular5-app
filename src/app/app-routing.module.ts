import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WallComponent } from './wall/wall.component';
import { AdminComponent } from './admin/admin.component';
import { ItemEditComponent } from './admin/item-edit/item-edit.component';
import { ItemListComponent } from './admin/item-list/item-list.component';

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
	}
	,
	{
		path: 'admin',
		component: AdminComponent
	},
	{
		path: 'admin/items',
		component: ItemListComponent
	},
	{
		path: 'admin/item/:id',
		component: ItemEditComponent
	},
	{
		path: 'admin/item/add',
		component: ItemEditComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
