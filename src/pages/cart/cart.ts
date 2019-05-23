import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { CheckoutPage } from '../checkout/checkout';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartItems: any[] = [];
  total: any;
  CartEmpty: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,
    public viewCtrl: ViewController,
    public alertController: AlertController) {

    this.total = 0.0;
    this.storage.ready().then(() => {

      this.storage.get("cart").then((data) => {
        if (data) {
          this.cartItems = data;
          console.log(data);
          if (this.cartItems.length > 0) {
            this.cartItems.forEach((item, index) => {
              this.total = this.total + (item.product.price * item.qty);
            })
          }
        } else {
          this.CartEmpty = true;
        }
      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }
  checkout() {
    this.storage.get("userLoginInfo").then((userLoginInfo) => {

      if (!userLoginInfo) {
        this.alertController.create({
          title: 'Access Denied ',
          message: 'Dear User Please Login and procced to checkout and thank you.',
          buttons: [{
            text: 'Login',
            handler: () => {
              this.navCtrl.setRoot(HomePage);
            }
          }]
        }).present();
      } else {
        this.navCtrl.push(CheckoutPage);
      }
    });

  }
  removeFromCart(item, i) {

    let price = item.product.price;
    let qty = item.qty;
    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then(() => {

      this.total = this.total - (price * qty);
    });
    if (this.cartItems.length == 0) {
      this.CartEmpty = true;
    }
  }
}
