import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './main-content/admin-page/admin-page.component';
import { EventsPageComponent } from './main-content/events-page/events-page.component';
import { UserPageComponent } from './main-content/user-page/user-page.component';
import { CategoriesComponent } from './main-content/categories/categories.component';
import { Login2Component } from './main-content/login2/login2.component';


const routes: Routes = [
  {path: '', component: Login2Component},
  {path: 'login2', component:  Login2Component },
  {path: 'categories', component: CategoriesComponent},
  {path: 'admin-page', component: AdminPageComponent},
  {path: 'events-page', component: EventsPageComponent},
  {path: 'user-page', component: UserPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
