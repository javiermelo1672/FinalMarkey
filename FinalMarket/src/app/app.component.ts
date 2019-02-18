import { Component,ViewChild} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {Nav,NavController} from 'ionic-angular';
import { IniciarSesiNPage } from '../pages/iniciar-sesi-n/iniciar-sesi-n';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { AngularFireAuth } from "@angular/fire/auth";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;
 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private afAuth:AngularFireAuth) {
    
    platform.ready().then(() => {
      

      let self = this;
      this.afAuth.auth.onAuthStateChanged(function(user) {
        console.log(user);
    
        if (user) {
         
          let params: URLSearchParams = new URLSearchParams();
          params.set('ids',user.uid);
          console.log(user.uid);
          self.nav.setRoot(TabsControllerPage);
            
        } else {

          self.nav.setRoot( IniciarSesiNPage);
         
         
        }
      });
      
      statusBar.backgroundColorByHexString('#020202');
      splashScreen.hide();
    });

  }
  
}
