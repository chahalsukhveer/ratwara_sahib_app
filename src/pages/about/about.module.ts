import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { TranslateModule } from '@ngx-translate/core';
import { AppVersion } from '@ionic-native/app-version';  

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
    TranslateModule.forChild()
  ],
  exports: [
    AboutPage
  ],
  providers: [
    AppVersion
  ]
})
export class AboutModule {}