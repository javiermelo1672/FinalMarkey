import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from "@angular/fire/auth";
import { Usuario } from '../../models/Usuario/Usuario';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CrearCuentaPage } from '../../pages/crear-cuenta/crear-cuenta';

@Component({
  selector: 'page-iniciar-sesi-n',
  templateUrl: 'iniciar-sesi-n.html'
})
export class IniciarSesiNPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  ids:string;
  userst= {} as Usuario;
  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController,public toastCtrl: ToastController,private alertCtrl: AlertController,private afAuth:AngularFireAuth) {
  }
  goToHola(userst:Usuario){


    try{

      let alert = this.alertCtrl.create({
        title: 'Perdona, ¡Algo ha salido mal!',
        subTitle: 'Es posible que tus credenciales estén incorrectas',
        buttons: ['Aceptar']

        
      });
      const loader = this.loadingCtrl.create({
        content: "Iniciando Sesión"
      });
      
      

      loader.present().then(() => {
     var that = this;
      this.afAuth.auth.signInWithEmailAndPassword(userst.email,userst.password).then(res => console.log(res)).catch(
        reject =>alert.present()
      ); 
      loader.dismiss();
    });




    }
    catch(e){
     console.log("error:", e);
     
    }
  }

  CrearCuenta(){
    this.navCtrl.push(CrearCuentaPage);
  }
}

  

