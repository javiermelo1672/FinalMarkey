import { Component,ViewChild} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import{UserService} from '../services/UserService.ts/user_service';
import { Usuarios} from '../models/Usuario/Usuarios';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import {Nav,NavController} from 'ionic-angular';
import { IniciarSesiNPage } from '../pages/iniciar-sesi-n/iniciar-sesi-n';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { TabsAdminControllerPage } from '../pages/tabs-admin-controller/tabs-admin-controller';
import { AngularFireAuth } from "@angular/fire/auth";
import {AlertasService} from './../services/Native_Services/Alertas/alertas_service';
import { Http, RequestOptions, URLSearchParams} from '@angular/http';
import { AAdirProveedorPage } from '../pages/a-adir-proveedor/a-adir-proveedor';
import { AAdirPaquetePage } from '../pages/a-adir-paquete/a-adir-paquete';

import { MenuController } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;
  item: Usuarios = {
    edad:'',
    foto:'',
    nombre:'',
    num_Documento:'',
    sexo:'',
    telefono:''
  }
  id:string;
  UserColeccion: AngularFirestoreCollection<Usuarios>;
  UserObservable: Observable<Usuarios[]>;
  displayname:string;
  emails:string;

  constructor(private menu: MenuController,private alertservice:AlertasService,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private afAuth:AngularFireAuth,public http: Http,private usuariosser: UserService) {
    

    

    this.menu.enable(false, 'first');

    platform.ready().then(() => {
      
      
      let self = this;
      this.afAuth.auth.onAuthStateChanged(function(user) {
        console.log(user);
    
        if (user) {



          if(user.isAnonymous){
                    self.nav.setRoot(TabsControllerPage);
          }
          else{

          
         
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

                if(obj.tipo=="Proveedor Turiscol"){
                  if(obj.estado=="Habilitado")
                  {
                    self.id=self.afAuth.auth.currentUser.uid;
                    self.UserColeccion = self.usuariosser.getspecificUserListfromFirestore(self.id);
                    self.UserObservable = self.UserColeccion.valueChanges();
                   self.alertservice.MostrarAlerta("¡Correcto!","Bienvenido(a) a Market Turist Admin");
                   self.menu.enable(true, 'first');
                   self.nav.setRoot(TabsAdminControllerPage);
                   
                  }
                  else{
                  
                   self.alertservice.MostrarAlerta("Sin autorización","Tu cuenta no esta habilitada para el inciio en Admin Panel, contacta al soporte tecnico");
                   self.afAuth.auth.signOut();
                  }
                }
                else{
                  self.afAuth.auth.signOut();
                  self.alertservice.MostrarAlerta("Sin autorización","Tu tipo de usuario no corresponde al de Cliente");
                }
                
               
                
               }
              
            }).catch(error=> self.alertservice.MostrarAlerta("¡Algo ha salido mal!","Error de Google Cloud Functions")&&  self.afAuth.auth.signOut());
          }  
        } else {

          

          self.nav.setRoot( IniciarSesiNPage);
          console.log(Response.error);
         
        }
      });


      
      statusBar.backgroundColorByHexString('#020202');
      
    });

  }

  goToTabs(params){
    if (!params) params = {};
    this.nav.setRoot(TabsAdminControllerPage);
  }
  goToAAdirProveedor(params){
    if (!params) params = {};
    this.nav.setRoot(AAdirProveedorPage);
  }
  goToAAdirPaquete(params){
    if (!params) params = {};
    this.nav.setRoot(AAdirPaquetePage);
  }

  Salir(params)
  {
    if (!params) params = {};
    this.menu.enable(false, 'first');
    this.afAuth.auth.signOut();
  }
  
}
