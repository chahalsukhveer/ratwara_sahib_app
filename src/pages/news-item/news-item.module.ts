import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsItemPage } from './news-item';

@NgModule({
  declarations: [
    NewsItemPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsItemPage)
  ],
  exports: [
    NewsItemPage
  ]
})
export class NewsItemModule {}