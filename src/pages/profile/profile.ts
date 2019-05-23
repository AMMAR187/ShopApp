import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage'
import { LoginPage } from '../login/login';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any;
  WooCommerce: any;
  loggedIn: boolean;


  constructor(public navCtrl: NavController, public modalController: ModalController, public navParams: NavParams,
    private http: Http, private storage: Storage,
    public alertController: AlertController) {
    this.user = navParams.get('user');
    console.log(this.user);


    this.WooCommerce = WC({
      url: 'http://ammar187.000webhostapp.com',
      consumerKey: "ck_324458a96ce29c61bffdcff79845e78566c2836f",
      consumerSecret: "cs_282a9fa1b663d235d4325fd819858709272a360f",
      wpAPI: true,
      version: 'wc/v3'
    });
    if (this.user) {
      this.WooCommerce.getAsync('customers/' + this.user.id, function (err, data, res) {
        console.log(res);
      });
    } else {
      this.alertController.create({
        title: "Sorry your are not logged in ",
        message: "Do you want to login?",
        buttons: [{
          text: "Login",
          handler: () => {
            navCtrl.push(LoginPage);
          }
        },
        {
          text: "Cancel",
          handler: () => { }
        }]
      });
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  openCart() {
    this.modalController.create(CartPage).present();
  }
}
