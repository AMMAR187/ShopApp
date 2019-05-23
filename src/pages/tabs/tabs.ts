import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ProductCategoryPage } from '../product-category/product-category';
import { WishlistPage } from '../wishlist/wishlist';
import { MenuPage } from '../menu/menu';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { CatogeryPage } from '../catogery/catogery';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  home: any = MenuPage;

  Account: any = ProfilePage;
  Login: any = LoginPage;
  Category: any = CatogeryPage;
  WishList: any = WishlistPage;
  mySelectedIndex: number;
  user: any;
  loggedIn: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
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

}
