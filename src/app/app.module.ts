
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { WindowRef } from './providers/window-ref';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import {HttpClientModule, HttpClient } from '@angular/common/http';

export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
        preloadModules: true
      }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: customTranslateLoader,
          deps: [HttpClient]
        }
      }
    ),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
      WindowRef,
      { provide: ErrorHandler, useClass: IonicErrorHandler },
      YoutubeVideoPlayer,
      GoogleAnalytics,
      InAppBrowser,
      StatusBar
    ]
})
export class AppModule { }
