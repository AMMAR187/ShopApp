import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import * as WC from 'woocommerce-api';
import { CartPage } from '../cart/cart';
import { Storage } from '@ionic/storage'
/**
 * Generated class for the ProductCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-category',
  templateUrl: 'product-category.html',
})
export class ProductCategoryPage {
  WooCommerce: any;
  products: any[];
  page: number;
  category: any;
  moreProducts: any[];

  constructor(public navCtrl: NavController, private storage: Storage, public modalController: ModalController, public navParams: NavParams, public toastController: ToastController) {
    this.page = 1;
    this.category = navParams.get('category');
    this.products = [];
    console.log(this.category);
    this.WooCommerce = WC({
      url: 'http://ammar187.000webhostapp.com',
      consumerKey: "ck_324458a96ce29c61bffdcff79845e78566c2836f",
      consumerSecret: "cs_282a9fa1b663d235d4325fd819858709272a360f",
      wpAPI: true,
      queryStringAuth: true,
      verifySsl: true,
      version: 'wc/v1'
    });
    this.WooCommerce.getAsync('products/?filter[product_cat]=' + this.category).then((data) => {
      let temp = JSON.parse(data.body);
      this.products = JSON.parse(data.body);
      if (this.products.length < 6)
        toastController.create({
          message: 'Sorry No Items found'
          , duration: 3000
        }).present();

      console.log(this.products);
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCategoryPage');
  }
  loadProducts(event) {
    if (event == null) {
      this.page = 2;
      this.products = [];
    }
    else
      this.page++;
    this.WooCommerce.getAsync('products?filter[product_cat]=' + this.category + '&page= ' + this.page).then((data) => {
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
  AddToFav(product) {

    this.storage.get('favorites').then((data) => {

      if (data == null || data.length == 0) {
        data = [];
        console.log("favorites empty");
        data.push({
          "product": product,
        });

      } else {

        var added = true;

        for (let i = 0; i < data.length; i++) {
          if (product.id == data[i].product.id) {
            added = false;
            console.log(data[i].product.id);
            console.log("The product is already in Wishlist");
            this.toastController.create({
              message: " The product is already in Wishlist",
              duration: 3000
            }).present();
            return;
          }

        }
        if (added) {
          console.log("Add New Product");
          data.push({
            "product": product
          });
        }
      }
      this.storage.set("favorites", data).then(() => {
        console.log("favorites updated");
        console.log(data);

        this.toastController.create({
          message: "favorites Updated",
          duration: 3000
        }).present();
      });
    });

  }

}
