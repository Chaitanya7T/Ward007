import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS,HttpBackend } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { ApiInterceptor } from './core';
import { MomentModule } from 'ngx-moment';
import { Network } from '@ionic-native/network/ngx';
import { FileTransfer,FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
export function HttpLoaderFactory(handler: HttpBackend) {
  const http = new HttpClient(handler);
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      // loader: {
      //   provide: TranslateLoader,
      //   useFactory: (createTranslateLoader),
      //   deps: [HttpClient]
      // }
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),
    MomentModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    Network,
    FileTransfer,
    File,
    FileTransferObject,
    FileOpener,
    FileTransfer,
    Deeplinks,
    Camera,
    FilePath,
    Chooser,
    PhotoViewer,
    Keyboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    NativeGeocoder,
    LocalNotifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public statusBar: StatusBar, public translate: TranslateService) {
    this.translate.setDefaultLang("en");
    this.translate.use("en");
  }
 }
