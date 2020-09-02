import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MagazinePage } from './magazine';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MagazinePage,
  ],
  imports: [
    IonicPageModule.forChild(MagazinePage),
    TranslateModule.forChild()
  ],
  exports: [
    MagazinePage
  ]
})
export class MagazineModule {}