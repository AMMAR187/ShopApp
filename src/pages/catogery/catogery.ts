import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { ProductCategoryPage } from '../product-category/product-category';
/**
 * Generated class for the CatogeryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catogery',
  templateUrl: 'catogery.html',
})
export class CatogeryPage {
  WooCommerce: any;
  catogeries: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.WooCommerce = WC({
      url: 'http://ammar187.000webhostapp.com',
      consumerKey: "ck_324458a96ce29c61bffdcff79845e78566c2836f",
      consumerSecret: "cs_282a9fa1b663d235d4325fd819858709272a360f",
      wpAPI: true,
      version: 'wc/v3'
    });

    this.WooCommerce.getAsync('products/categories').then((data) => {
      console.log(JSON.parse(data.body));
      this.catogeries = JSON.parse(data.body);
    }, (err) => {
      console.log(err);
    });

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad CatogeryPage');
  }
  openCat(cat) {
    this.navCtrl.push(ProductCategoryPage, { "category": cat.name });
  }
}
