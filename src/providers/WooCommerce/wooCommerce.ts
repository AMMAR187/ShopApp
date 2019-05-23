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
export class WooCommerceProvider {
    WooCommerce: any;
    constructor(private http: HttpClient) {
        this.WooCommerce = WC({
            url: 'http://ammar187.000webhostapp.com',
            consumerKey: "ck_324458a96ce29c61bffdcff79845e78566c2836f",
            consumerSecret: "cs_282a9fa1b663d235d4325fd819858709272a360f",
            wpAPI: true,
            version: 'wc/v3'
        });
    }
}