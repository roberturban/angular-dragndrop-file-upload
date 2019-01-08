import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { DropzoneComponent } from './components/dropzone/dropzone.component';
import { FileListComponent } from './components/file-list/file-list.component';

import { FileListService } from './services/file-list.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavigationComponent,
    SideNavigationComponent,
    DropzoneComponent,
    FileListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    FileListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
