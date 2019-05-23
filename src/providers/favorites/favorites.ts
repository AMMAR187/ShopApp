import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';


import { Storage } from '@ionic/storage'
import * as WC from 'woocommerce-api';
/*
  Generated class for the FavoritesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoritesProvider {
  product: any;
  WooCommerce: any;

  constructor(public http: HttpClient) {
    console.log('Hello FavoritesProvider Provider');
  }

}
