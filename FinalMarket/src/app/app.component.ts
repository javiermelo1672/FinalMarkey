import { Component,ViewChild} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {Nav,NavController} from 'ionic-angular';
import { IniciarSesiNPage } from '../pages/iniciar-sesi-n/iniciar-sesi-n';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { AngularFireAuth } from "@angular/fire/auth";
import {AlertasService} from './../services/Native_Services/Alertas/alertas_service';
import { Http, RequestOptions, URLSearchParams} from '@angular/http';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;
 

  constructor(private alertservice:AlertasService,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private afAuth:AngularFireAuth,public http: Http) {
    
    platform.ready().then(() => {
      

      let self = this;
      this.afAuth.auth.onAuthStateChanged(function(user) {
        console.log(user);
    
        if (user) {
         
          let params: URLSearchParams = new URLSearchParams();
          params.set('ids',user.uid);
          console.log(user.uid);
          let requestOptions = new RequestOptions();
          requestOptions.search = params;
          self.http.get('https://us-central1-marketplaceturist.cloudfunctions.net/autentifyuser',requestOptions).toPromise().then(
          function(response)
            {
              console.log(response.json());
              var obj =response.json();
              console.log(obj.tipo)
             
           
               if(obj.tipo=="Cliente Turiscol")
               {
                 if(obj.estado=="Habilitado")
                 {
                  self.alertservice.MostrarAlerta("¡Correcto!","Bienvenido(a) a Market Turist");
                  self.nav.setRoot(TabsControllerPage);
                  
                 }
                 else{
                 
                  self.alertservice.MostrarAlerta("Sin autorización","Tu cuenta no esta habilitada, contacta al soporte tecnico");
                  self.afAuth.auth.signOut();
                 }
                
               }
               else{
                
                self.afAuth.auth.signOut();
                self.alertservice.MostrarAlerta("Sin autorización","Tu tipo de usuario no corresponde al de Cliente");
                
               }
              
            }).catch(error=> self.alertservice.MostrarAlerta("¡Algo ha salido mal!","Error de Google Cloud Functions")&&  self.afAuth.auth.signOut());
            
        } else {

          self.nav.setRoot( IniciarSesiNPage);
         
         
        }
      });


      
      statusBar.backgroundColorByHexString('#020202');
      splashScreen.hide();
    });

  }
  
}
