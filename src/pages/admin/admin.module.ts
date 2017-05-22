import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPage } from './admin';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../app/providers/auth/auth.service';

@NgModule({
  declarations: [
    AdminPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminPage),
    TranslateModule.forChild()
  ],
  exports: [
    AdminPage
  ],
  providers: [
      AuthService
    ]
})
export class AdminModule {}