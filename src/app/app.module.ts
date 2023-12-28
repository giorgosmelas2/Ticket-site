import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule} from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminPageComponent } from './main-content/admin-page/admin-page.component';
import { PageNotFoundComponent } from './main-content/page-not-found/page-not-found.component';
import { UserPageComponent } from './main-content/user-page/user-page.component';
import { MainContentComponent } from './main-content/main-content.component';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { EventsPageComponent } from './main-content/events-page/events-page.component';
import { CalendarModule } from 'primeng/calendar';

const appRoutes: Routes =[
  {path: 'admin-page', component: AdminPageComponent},
  {path: 'user-page', component: UserPageComponent},
  {path: 'events-page', component: EventsPageComponent},
  {path: '**', component: PageNotFoundComponent}
 
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AdminPageComponent,
    PageNotFoundComponent,
    UserPageComponent,
    MainContentComponent,
    EventsPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    AccordionModule,
    ButtonModule,
    AvatarModule,
    CommonModule,
    PanelModule,
    InputTextModule,
    FormsModule,
    FileUploadModule,
    CalendarModule,

    RouterModule.forRoot(
      appRoutes, {enableTracing: true}
    )
  ],

  providers: [
    provideClientHydration()
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
