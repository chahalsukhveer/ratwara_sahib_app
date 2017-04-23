import { IonicPageModule } from 'ionic-angular';
import { AudioListPage } from './audio-list';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicAudioModule, AudioProvider, audioProviderFactory } from '../../app/ionic-audio';


@NgModule({
  declarations: [
    AudioListPage,
  ],
  imports: [
    IonicPageModule.forChild(AudioListPage),
    TranslateModule.forChild(),
    NgxPaginationModule,
    IonicAudioModule.forRoot({ provide: AudioProvider, useFactory: audioProviderFactory })
  ],
  exports: [
    AudioListPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AudioListModule {}