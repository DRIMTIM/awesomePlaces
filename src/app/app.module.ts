import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AddPlacePage} from "../pages/add-place/add-place";
import {PlacePage} from "../pages/place/place";
import {SetLocationPage} from "../pages/set-location/set-location";

import {AgmCoreModule} from "angular2-google-maps/core";
import { Geolocation } from '@ionic-native/geolocation';
import {Camera} from "@ionic-native/camera";
import {PlacesService} from "../services/places";
import {IonicStorageModule} from "@ionic/storage";
import {File} from "@ionic-native/file";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
      AgmCoreModule.forRoot({
          apiKey: "AIzaSyAKwGJl41Vszn6-V65Z_KRlzJUHFUlA8dE"
      }),
      IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
      Geolocation,
      Camera,
      File,
      PlacesService
  ]
})
export class AppModule {}
