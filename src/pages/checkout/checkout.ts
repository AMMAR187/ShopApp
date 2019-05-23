import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  WooCommerce: any;
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public alertController: AlertController, private payPal: PayPal) {
    this.newOrder = [];
    this.newOrder.shipping = {};
    this.newOrder.billing = {};
    this.newOrder.billing.address_1 = "";
    this.newOrder.shipping.address_1 = "";

    this.paymentMethods = [
      { method_id: 'bacs', method_title: 'Direct Bank Transfer' },
      { method_id: 'cheque', method_title: 'Cheque Payment' },
      { method_id: 'cod', method_title: 'Cash on Delivery' },
      { method_id: 'paypal', method_title: 'PayPal' }];

    this.WooCommerce = WC({
      url: 'http://ammar187.000webhostapp.com',
      consumerKey: "ck_324458a96ce29c61bffdcff79845e78566c2836f",
      consumerSecret: "cs_282a9fa1b663d235d4325fd819858709272a360f",
      wpAPI: true,
      version: 'wc/v3'
    });

    this.storage.get("userLoginInfo").then((userLoginInfo) => {

      this.userInfo = userLoginInfo.user;
      let email = this.userInfo.email;
      this.WooCommerce.getAsync("customers?email=" + email).then((data) => {
        let Order = JSON.parse(data.body);
        this.newOrder = Order['0'];
        console.log(Order);
      });

    });
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if (this.billing_shipping_same) {
      this.newOrder.shipping = this.newOrder.billing;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  placeOrder() {
    let orderItems: any[] = [];
    let data: any = {};
    let paymentData: any = {};

    this.paymentMethods.forEach((element, index) => {
      if (element.method_id == this.paymentMethod) {
        paymentData = element;
      }
    });
    data = {
      payment_method: paymentData.method_id,
      payment_method_title: paymentData.method_title
      ,
      billing: this.newOrder.billing,
      shipping: this.newOrder.shipping,
      customer_id: this.userInfo.id || '',
      line_items: orderItems
    };

    if (paymentData.method_id == "paypal") {
      //TODO
      this.payPal.init({
        PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
        PayPalEnvironmentSandbox: 'ARdfFw93LiC2IlxkQLANW0W33i9ePKodZaa43C8kTDCltCdvkHaF1kJ5sS57jZ-pFn37VN-kg_VMiNtc'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {

          this.storage.get('cart').then((cart) => {

            let total = 0.0;
            cart.forEach((element, index) => {
              orderItems.push({ product_id: element.product.id, quantity: element.qty });
              total = total + (element.product.price * element.qty);
            });

            let payment = new PayPalPayment(total.toString(), 'USD', 'Description', 'sale');
            this.payPal.renderSinglePaymentUI(payment).then((Response) => {
              alert(JSON.stringify(Response));

              data.line_items = orderItems;
              console.log(data);
              let orderData: any = {};
              orderData = data;

              this.WooCommerce.postAsync('orders', orderData).then((data) => {
                alert("Order has placed Successfully");

                let orderRes = JSON.parse(data.body);
                console.log(orderRes);
                this.alertController.create({
                  title: 'Order Has Placed Successfully ',
                  message: 'Your has been placed successfully .Your order number is ' + orderRes.number,
                  buttons: [{
                    text: 'OK',
                    handler: () => {
                      this.navCtrl.setRoot(HomePage);
                    }
                  }]
                }).present();
              });

            })
          }, () => {
            // Error or render dialog closed without being successful
          });
        }, () => {
          // Error in configuration
        });
      }, () => {
        // Error in initialization, maybe PayPal isn't supported or something else
      });

    } else {
      this.storage.get("cart").then((cart) => {
        console.log(cart);

        cart.forEach((element, index) => {
          orderItems.push({
            product_id: element.product.id,
            quantity: element.qty
          });
          console.log(orderItems);
        });
        data.line_items = orderItems;
        let orderData: any = {};
        orderData = data;

        this.WooCommerce.postAsync('orders', orderData).then((data) => {
          let orderRes = JSON.parse(data.body);
          console.log(orderRes);
          this.alertController.create({
            title: 'Order Has Placed Successfully ',
            message: 'Your has been placed successfully .Your order number is ' + orderRes.number,
            buttons: [{
              text: 'OK',
              handler: () => {
                this.navCtrl.setRoot(HomePage);
              }
            }]
          }).present();
        });

      });
    }
  }
}
