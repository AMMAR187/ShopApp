import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { ProductDetailsPage } from '../product-details/product-details';
import { ProductCategoryPage } from '../product-category/product-category';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { WishlistPage } from '../wishlist/wishlist';
import { CartPage } from '../cart/cart';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  mySelectedIndex: number;
  searchQuery: string = "";
  WooCommerce: any;
  products: any[];
  page: number = 2;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController, public loadingController: LoadingController, public toastController: ToastController) {
    this.searchQuery = navParams.get("searchQuery");
    const loader = this.loadingController.create({
      content: "Please wait...",
      duration: 5000
    });
    if (!this.products) {
      loader.present();
    }

    this.WooCommerce = WC({
      url: 'http://ammar187.000webhostapp.com',
      consumerKey: "ck_324458a96ce29c61bffdcff79845e78566c2836f",
      consumerSecret: "cs_282a9fa1b663d235d4325fd819858709272a360f",
      wpAPI: true,
      version: 'wc/v3'
    });
    this.WooCommerce.getAsync('products?search=' + this.searchQuery).then((searchData) => {
      this.products = JSON.parse(searchData.body);

      if (this.products.length == 0) {
        this.toastController.create({
          message: "Sorry we can't find it try again !",
          duration: 5000
        }).present();
      }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  loadProducts(event) {
    if (event == null) {
      this.page = 2;
      this.products = [];
    }
    else
      this.page++;
    this.WooCommerce.getAsync('products?search=' + this.searchQuery + '&page= ' + this.page).then((data) => {
      console.log(JSON.parse(data.body));
      this.products = this.products.concat(JSON.parse(data.body));
      if (event != null) {
        event.complete();
      }
      if (JSON.parse(data.body).length < 10) {
        event.enable(false);
        this.toastController.create({
          message: 'No more Products!',
          duration: 5000
        }).present();
      }
    }, (err) => {
      console.log(err);
    });

  }
  productDetails(product) {
    this.navCtrl.push(ProductDetailsPage, { "product": product });
  }
  openCart() {
    this.modalController.create(CartPage).present();
  }

}
