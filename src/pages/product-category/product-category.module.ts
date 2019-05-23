import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductCategoryPage } from './product-category';

@NgModule({
  declarations: [
    ProductCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductCategoryPage),
  ],
})
export class ProductCategoryPageModule {}
