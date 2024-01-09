import { NgModule } from '@angular/core';
import {Routes} from '@angular/router';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule} from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPageComponent } from './main-content/admin-page/admin-page.component';
import { UserPageComponent } from './main-content/user-page/user-page.component';
import { MainContentComponent } from './main-content/main-content.component';
import { EventsPageComponent } from './main-content/events-page/events-page.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CategoriesComponent } from './main-content/categories/categories.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Login2Component } from './main-content/login2/login2.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    UserPageComponent,
    MainContentComponent,
    EventsPageComponent,
    CategoriesComponent,
    SidebarComponent,
    Login2Component,
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule,
    ButtonModule,
    AvatarModule,
    CommonModule,
    PanelModule,
    InputTextModule,
    FormsModule,
    FileUploadModule,
    CalendarModule,
    TableModule,
    PasswordModule,
    InputTextareaModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    ToastModule,
    CardModule,
    SidebarModule,
    CascadeSelectModule
  ],

  providers: [
    provideClientHydration()
  ],

  bootstrap: [AppComponent]
  
})


export class AppModule { }
