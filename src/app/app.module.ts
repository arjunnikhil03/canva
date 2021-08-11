import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { NgxSvgModule } from 'ngx-svg';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //NgxSvgModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
