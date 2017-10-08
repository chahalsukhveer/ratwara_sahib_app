
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { WindowRef } from './providers/window-ref';
import { YoutubeService } from './providers/youtube-service/youtube-service';
import { YoutubeServiceLive } from './providers/youtube-service-live/youtube-service-live';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'ad8d2b4e',
  },
  'push': {
    'sender_id': '169616509593',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        "iconColor": "gray",
        "icon": "icon_notification"
      }
    }
  }
};

export function customTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
        preloadModules: true
      }),
    CloudModule.forRoot(cloudSettings),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBzH2CivhtNDuhHBQfQCNihnQVqlfaeW9o' }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: customTranslateLoader,
          deps: [Http]
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
      YoutubeService,
      YoutubeServiceLive
    ]
})
export class AppModule { }
