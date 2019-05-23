import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newUser: any = [];
  billing_shipping_same: boolean;
  WooCommerce: any;
  data: any = {
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    username: 'john.doe',
    password: 'ammar1996',
    billing: {
      first_name: 'John',
      last_name: 'Doe',
      company: '',
      address_1: '969 Market',
      address_2: '',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US',
      email: 'john.doe@example.com',
      phone: '(555) 555-5555'
    },
    shipping: {
      first_name: 'John',
      last_name: 'Doe',
      company: '',
      address_1: '969 Market',
      address_2: '',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US'
    }
  }
  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastController: ToastController, public alertController: AlertController) {
    this.newUser.billing = {};
    this.newUser.shipping = {};
    this.billing_shipping_same = false;



    this.WooCommerce = WC({
      url: 'https://ammar187.000webhostapp.com',
      consumerKey: "ck_324458a96ce29c61bffdcff79845e78566c2836f",
      consumerSecret: "cs_282a9fa1b663d235d4325fd819858709272a360f",
      wpAPI: true,
      queryStringAuth: true,
      version: 'wc/v3'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;
  }
  checkPassword() {
    if (this.newUser.password != this.newUser.confirm_password) {
      this.toastController.create({
        message: "Password isn't matching please type again",
        showCloseButton: true
      }).present();
    }
  }
  checkEmail() {
    let validEmail = false;
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(this.newUser.email)) {

      //email looks valid
      this.WooCommerce.getAsync('customers?email=' + this.newUser.email).then((data) => {
        let res = (JSON.parse(data.body));
        console.log(res);

        if (res.length == 0) {
          validEmail = true;

          this.toastController.create({
            message: "Congratulation Your Email is Valid",
            duration: 3000
          }).present();

        } else {
          validEmail = false;

          this.toastController.create({
            message: "Email already registered . Please check again.",
            showCloseButton: true
          }).present();
        }
        console.log(validEmail);
      });

    } else {
      validEmail = false;

      this.toastController.create({
        message: "Invalid Email. Please type a Valid Email.",
        showCloseButton: true
      }).present();

      console.log(validEmail);
    }
  }
  signup() {
    let customerData = {
      customer: {}
    }
    customerData.customer = {
      "email": this.newUser.email,
      "first_name": this.newUser.first_name,
      "last_name": this.newUser.last_name,
      "username": this.newUser.username,
      "password": this.newUser.password,
      "billing": {
        "first_name": this.newUser.billing.first_name,
        "last_name": this.newUser.billing.last_name,
        "company": "",
        "address_1": this.newUser.billing.address_1,
        "address_2": this.newUser.billing.address_2,
        "city": this.newUser.billing.city,
        "state": this.newUser.billing.state,
        "postcode": this.newUser.billing.postcode,
        "country": this.newUser.billing.country,
        "email": this.newUser.email,
        "phone": this.newUser.billing.phone
      },
      "shipping": {
        "first_name": this.newUser.shipping.first_name,
        "last_name": this.newUser.shipping.last_name,
        "company": "",
        "address_1": this.newUser.shipping.address_1,
        "address_2": this.newUser.shipping.address_2,
        "city": this.newUser.shipping.city,
        "state": this.newUser.shipping.state,
        "postcode": this.newUser.shipping.postcode,
        "country": this.newUser.shipping.country
      }
    }
    if (this.billing_shipping_same) {
      this.newUser.shipping = this.newUser.billing;
    }

    this.WooCommerce.postAsync('customers', customerData.customer).then((data) => {
      let respones = (JSON.parse(data.body));
      console.log(JSON.parse(data.body));
      if (data.statusCode == 400) {
        this.toastController.create({
          message: respones.message,
          showCloseButton: true
        }).present();
      }
      if (data.statusMessage == "Created") {
        this.alertController.create({
          message: "Email already registered . Please check again.",
          title: "Account Created",
          buttons: [{
            text: "Login",
            handler: () => {

            }
          }]
        }).present();
      }

    }).catch((err) => {
      console.log(err);
    });
  }

}
