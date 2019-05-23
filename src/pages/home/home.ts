import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController, LoadingController, ModalController } from 'ionic-angular';
import * as WC from 'woocommerce-api';


import { ProductDetailsPage } from '../product-details/product-details';
import { SearchPage } from '../search/search';
import { ProductCategoryPage } from '../product-category/product-category';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('content') childNavCtrl: NavController;
  WooCommerce: any;
  toggled: boolean = false;

  homePage: any;
  Categories: any[];
  moreProducts: any[];
  products: any[];
  featured: any[];
  onSale: any[];
  product: any[];
  img: any[];
  page: number;
  @ViewChild('productSlide') productSlide: Slides;
  searchQuery: string = "";

  constructor(public navCtrl: NavController, public modalController: ModalController, public toastController: ToastController, public loadingCtrl: LoadingController) {
    this.homePage = HomePage;
    this.page = 2;
    this.toggled = false;

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 5000
    });
    if (!this.product) {
      loader.present();
    }
    this.WooCommerce = WC({
      url: 'http://ammar187.000webhostapp.com',
      consumerKey: "ck_324458a96ce29c61bffdcff79845e78566c2836f",
      consumerSecret: "cs_282a9fa1b663d235d4325fd819858709272a360f",
      wpAPI: true,
      version: 'wc/v3'
    });

    this.loadProducts(null);
    this.WooCommerce.getAsync('products').then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body);

    }, (err) => {
      console.log(err);
    });

    this.WooCommerce.getAsync('products?featured=true').then((data) => {
      console.log(JSON.parse(data.body));
      this.featured = JSON.parse(data.body);


    }, (err) => {
      console.log(err);
    });
    this.WooCommerce.getAsync('products?on_sale=true').then((data) => {
      console.log(JSON.parse(data.body));
      this.onSale = JSON.parse(data.body);


    }, (err) => {
      console.log(err);
    });
    this.WooCommerce.getAsync('products/categories?parent=0').then((data) => {
      console.log(JSON.parse(data.body));
      let temp: any[] = JSON.parse(data.body);

      temp.forEach((e) => {

        if (e.parent == 0) {

          if (e.slug == "clothing" || "tshirt" || "hoodies" || "bag") {
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

        }
        this.Categories = temp;
        console.log(this.Categories);

      });
    });
  }
  ionViewDidLoad() {

    setInterval(() => {
      if (this.productSlide.getActiveIndex() == this.productSlide.length() - 1)
        this.productSlide.slideTo(0);

      this.productSlide.slideNext();
    }, 3000);
  }

  loadProducts(event) {
    if (event == null) {
      this.page = 2;
      this.moreProducts = [];
    }
    else
      this.page++;
    this.WooCommerce.getAsync('products?page=' + this.page).then((data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body));
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
  onSearch(event) {
    console.log(this.searchQuery.length);
    if (this.searchQuery.length > 0) {
      this.navCtrl.push(SearchPage, { "searchQuery": this.searchQuery });
    }
  }
  openCategory(category) {
    this.navCtrl.push(ProductCategoryPage, { "category": category });
  }
  openCart() {
    this.modalController.create(CartPage).present();
  }
  toggle() {
    this.toggled = !this.toggled;
  }
  cancelSearch() {
    this.toggled = false;
  }
}
