import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimengLibraryModule } from './frameworks/primeng-library.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppLayoutModule } from './core/layout/app.layout.module';
import { MessageService } from 'primeng/api';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppLayoutModule,
    HttpClientModule,
    FormsModule,
    DynamicDialogModule,
    PrimengLibraryModule
  ],
  providers: [MessageService, DialogService, DynamicDialogModule, DynamicDialogRef, PrimengLibraryModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
