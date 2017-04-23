import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsItemPage } from './news-item';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewsItemPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsItemPage),
    TranslateModule.forChild()
  ],
  exports: [
    NewsItemPage
  ]
})
export class NewsItemModule {}