import { Component } from '@angular/core';
import { IonicPage, NavController, ItemSliding, NavParams, ModalController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {
  favorites: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastrCtrl: ToastController,
    private alertCtrl: AlertController,
    private loeadingCtrl: LoadingController,
    public modalController: ModalController,
    private storage: Storage) {
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
    this.storage.get('favorites').then((data) => {
      this.favorites = data;
      console.log(data);

    });


  }
  openCart() {
    this.modalController.create(CartPage).present();
  }
  deleteFavorite(product) {
    this.storage.get('favorites').then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (product == data[i].product.id) {

          data.splice(i, 1);
          this.favorites = data;
          this.storage.set("favorites", data).then(() => {
            this.toastrCtrl.create({
              message: "favorites Updated",
              duration: 3000
            }).present();
          });
        }
      }
    });
  }


}
