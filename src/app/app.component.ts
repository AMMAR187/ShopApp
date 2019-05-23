import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuPage } from '../pages/menu/menu';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';

export interface PageInterface {
  title: string;
  component: any;
  index?: number;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  appPages: PageInterface[] = [
    { title: 'Favorites', component: SearchPage, index: 0 },
    { title: 'Account', component: SearchPage, index: 1 },
    { title: 'Home', component: SearchPage, index: 2 },
    { title: 'Category', component: SearchPage, index: 3 }

  ];
  rootPage: any = TabsPage;



  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();



  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.oneSignal.startInit('bfad2573-e58c-4084-94b6-6a29533d9ed9', '738391469303');

      // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      // this.oneSignal.handleNotificationReceived().subscribe(() => {
      //   // do something when notification is received
      // });

      // this.oneSignal.handleNotificationOpened().subscribe(() => {
      //   // do something when a notification is opened
      // });

      // this.oneSignal.endInit();
    });

  }
  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario



    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }


  }

}
