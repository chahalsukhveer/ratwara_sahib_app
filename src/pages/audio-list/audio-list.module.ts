import { IonicPageModule } from 'ionic-angular';
import { AudioListPage } from './audio-list';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicAudioModule } from '../../app/ionic-audio';

@NgModule({
  declarations: [
    AudioListPage,
  ],
  imports: [
    IonicPageModule.forChild(AudioListPage),
    TranslateModule.forChild(),
    NgxPaginationModule,
    IonicAudioModule.forRoot()
  ],
  exports: [
    AudioListPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AudioListModule {}