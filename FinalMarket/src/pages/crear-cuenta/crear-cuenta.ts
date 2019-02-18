import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Usuarios } from '../../models/Usuario/Usuarios';
import { Usuario } from '../../models/Usuario/Usuario';
import { AlertController } from 'ionic-angular';
import {UserService} from '../../services/UserService.ts/user_service';
import { AngularFireAuth } from "@angular/fire/auth";
@Component({
  selector: 'page-crear-cuenta',
  templateUrl: 'crear-cuenta.html'
})
export class CrearCuentaPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  userst= {} as Usuario;
  userTur={} as Usuarios;
  ids:string;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,private userob:UserService,private afAuth: AngularFireAuth) {
  }


  async CrearCuenta(userst:Usuario,userTur:Usuarios){

    try{


        
      
     
      
        const result=await this.afAuth.auth.createUserWithEmailAndPassword(userst.email,userst.password);
        this.ids=this.afAuth.auth.currentUser.uid;
        console.log(this.ids);

        
       this.userob.addUser(userTur,this.ids);
        
       let alert = this.alertCtrl.create({
        title: 'Correcto',
        subTitle: 'Te has registrado de manera correcta',
        buttons: ['Aceptar']
      });
        
        
      
     
       }
       catch(e){
        let alert = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'Verficar credenciales',
          buttons: ['Aceptar']
        });
   

  }
  
}
}
