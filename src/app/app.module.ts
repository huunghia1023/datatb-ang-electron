import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GetTikTokComponent } from './get-tik-tok/get-tik-tok.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';

@NgModule({
  declarations: [
    AppComponent,
    GetTikTokComponent,
    UploadVideoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
