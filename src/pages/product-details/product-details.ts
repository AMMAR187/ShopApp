import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { CartPage } from '../cart/cart';

import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product: any;
  WooCommerce: any;
  reviews: any[];
  attributes: any[];
  price: any[];
  variation: any;
  menu: string = 'Specifications';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,
    public toastController: ToastController,
    public modalController: ModalController) {
    this.product = navParams.get("product");
    let att = this.product.variations;


    this.reviews = [];


    this.WooCommerce = WC({
      url: 'http://ammar187.000webhostapp.com',
      consumerKey: "ck_324458a96ce29c61bffdcff79845e78566c2836f",
      consumerSecret: "cs_282a9fa1b663d235d4325fd819858709272a360f",
      wpAPI: true,
      version: 'wc/v3'
    });

    this.WooCommerce.getAsync('products/reviews?product_id=' + this.product.id).then((data => {
      if (data) {
        this.reviews = JSON.parse(data.body);
      } else {
        this.reviews = [];
      }
      console.log(this.reviews);
    }), (err) => {
      console.log(err);
    });




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }
  tab(option) {
    console.log(option);
  }
  menuTabs(val: string) {
    this.menu = val;
  }
  addToCart(product) {

    this.storage.get('cart').then((data) => {

      if (data == null || data.length == 0) {
        data = [];
        console.log("cart empty");
        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price),
          "lineitems": []


        });

      } else {

        let added = 0;

        for (let i = 0; i < data.length; i++) {
          if (product.id == data[i].product.id) {
            let qty = data[i].qty;
            console.log("Product already in Cart");
            data[i].qty = qty + 1
            data[i].amount = parseFloat(data[i].amount) + parseFloat(product.price);
            added = 1;
          }
        }
        if (added == 0) {
          console.log("Add New Product");
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)

          });
        }
      }
      this.storage.set("cart", data).then(() => {
        console.log("cart updated");
        console.log(data);

        this.toastController.create({
          message: "Cart Updated",
          duration: 3000
        }).present();
      });
    });

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



