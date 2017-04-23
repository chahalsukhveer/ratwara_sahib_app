import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthService } from './providers/auth/auth.service';
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
        'iconColor': '#343434'
      }
    }
  }
};

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig(), http);
}

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
    IonicModule.forRoot(MyApp),
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
      { provide: AuthHttp, 
        useFactory: getAuthHttp,
        deps: [Http]
      },
      AuthService,
      WindowRef,
      YoutubeService,
      YoutubeServiceLive
    ]
})
export class AppModule { }
