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

import { DropzoneModule, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: '/api/fileUpload'
};

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
    DropzoneModule,
    BrowserModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    FileListService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
