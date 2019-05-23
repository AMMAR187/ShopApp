import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SignupPage } from '../signup/signup';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastController: ToastController,
    public http: Http,
    public alertController: AlertController,
    public storage: Storage
  ) {
    this.username = '';
    this.password = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    this.http.get("https://ammar187.000webhostapp.com/api/auth/generate_auth_cookie/username=" + this.username + "&password=" + this.password)
      .subscribe((res) => {
        console.log(res.json());
        let response = res.json();
        if (response.error) {
          this.toastController.create({
            message: response.error,
            duration: 5000
          }).present();
          return;
        }
        this.storage.set("userLoginInfo", response).then((data) => {
          this.alertController.create({
            title: "Login Successful",
            message: "You have been logged in successfully.",
            buttons: [{
              text: "OK",
              handler: () => {
                if (this.navParams.get("next")) {
                  this.navCtrl.push(this.navParams.get("next"))
                } else {
                  this.navCtrl.pop();
                }
              }
            }]
          }).present();
        })
      });

  }
  openPage() {
    this.navCtrl.push(SignupPage);
  }
}
