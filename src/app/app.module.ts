import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { PayPal } from '@ionic-native/paypal';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { ProductCategoryPage } from '../pages/product-category/product-category';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { CartPage } from '../pages/cart/cart';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { CheckoutPage } from '../pages/checkout/checkout';
import { SearchPage } from '../pages/search/search';
import { ProfilePage } from '../pages/profile/profile';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { FavoritesProvider } from '../providers/favorites/favorites';
import { CatogeryPage } from '../pages/catogery/catogery';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    ProductCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage,
    LoginPage,
    CheckoutPage,
    SearchPage,
    ProfilePage,
    WishlistPage,
    TabsPage,
    CatogeryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    ProductCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage,
    LoginPage,
    CheckoutPage,
    SearchPage,
    ProfilePage,
    WishlistPage,
    TabsPage,
    CatogeryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PayPal,


    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FavoritesProvider
  ]
})
export class AppModule { }
