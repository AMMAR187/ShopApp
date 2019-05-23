import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatogeryPage } from './catogery';

@NgModule({
  declarations: [
    CatogeryPage,
  ],
  imports: [
    IonicPageModule.forChild(CatogeryPage),
  ],
})
export class CatogeryPageModule {}
