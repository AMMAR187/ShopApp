import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as WC from 'woocommerce-api';
import { ProductCategoryPage } from '../product-category/product-category';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { CartPage } from '../cart/cart';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile';
import { WishlistPage } from '../wishlist/wishlist';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  home: any;
  Account: any;
  Category: any;
  WishList: any;
  homePage: any;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;
  loggedIn: boolean;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public modalController: ModalController, public alertController: AlertController) {
    this.homePage = HomePage;

    this.Account = ProfilePage;
    this.Category = ProductCategoryPage;
    this.WishList = WishlistPage;
    this.user = {};
    this.WooCommerce = WC({
      url: 'http://ammar187.000webhostapp.com',
      consumerKey: "ck_324458a96ce29c61bffdcff79845e78566c2836f",
      consumerSecret: "cs_282a9fa1b663d235d4325fd819858709272a360f",
      wpAPI: true,
      version: 'wc/v3'
    });
    this.WooCommerce.getAsync('products/categories').then((data) => {
      console.log(JSON.parse(data.body));
    });
    this.WooCommerce.getAsync('products/categories?parent=0').then((data) => {
      console.log(JSON.parse(data.body));
      let temp: any[] = JSON.parse(data.body);

      temp.forEach((e) => {

        if (e.parent == 0) {

          if (e.slug == "clothing" || "tshirt" || "hoodies") {
            e.icon = "shirt";
          }

          if (e.slug == "music") {
            e.icon = "musical-notes";
          }
          if (e.slug == "decor") {
            e.icon = "images";
          }
          if (e.slug == "uncategorized") {
            e.icon = "more";
          }
          console.log(e);
        }
        this.categories = temp;

      });

    }, (err) => {
      console.log(err);
    });

  }

  ionViewDidEnter() {
    this.storage.ready().then(() => {
      this.storage.get('userLoginInfo').then((userLoginInfo) => {
        if (userLoginInfo != null) {
          console.log("User logged in ...");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;
        } else {
          this.user = {};
          console.log("No User found ...");
          this.loggedIn = false;
        }
      })
    })
  }
  openCategory(category) {
    this.childNavCtrl.push(ProductCategoryPage, { "category": category });
  }
  openPage(pageName: string) {
    if (pageName == "SignupPage") {
      this.navCtrl.push(SignupPage);
    }
    if (pageName == "LoginPage") {
      this.navCtrl.push(LoginPage);
    }

    if (pageName == "Cart") {
      this.modalController.create(CartPage).present();
    }
    if (pageName == "Logout") {

      this.alertController.create({
        title: 'Confirm Logout',
        message: 'Do you want to Logout?',
        buttons: [{
          text: 'Yes Logout',
          handler: () => {
            this.storage.remove("userLoginInfo").then(() => {
              this.user = {};
              this.loggedIn = false;
            })
          }
        }, {
          text: "Cancel",
          handler: () => {

          }
        }]

      }).present();


    }
  }

}
