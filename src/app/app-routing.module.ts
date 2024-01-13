import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './main-content/admin-page/admin-page.component';
import { EventsPageComponent } from './main-content/events-page/events-page.component';
import { UserPageComponent } from './main-content/user-page/user-page.component';
import { CategoriesComponent } from './main-content/categories/categories.component';
import { OrdersComponent } from './main-content/orders/orders.component';
import { MainContentComponent } from './main-content/main-content.component';
import { LoginTestComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: LoginTestComponent},
  {path: 'login', component: LoginTestComponent},
  {
    path: 'main-content',
    component: MainContentComponent,
    children: [
      { path: '', redirectTo: 'admin-page', pathMatch: 'full' }, // Default child route
      { path: 'categories', component: CategoriesComponent },
      { path: 'admin-page', component: AdminPageComponent },
      { path: 'events-page', component: EventsPageComponent },
      { path: 'user-page', component: UserPageComponent },
      { path: 'orders', component: OrdersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
