import { UTarjetas } from './../../models/Usuario/UTarjetas';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UTarjetasService} from '../../services/TarjetasService/tarjeta_service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import {AlertasService} from '../../services/Native_Services/Alertas/alertas_service';

@Component({
  selector: 'page-a-adir-tarjeta',
  templateUrl: 'a-adir-tarjeta.html'
})
export class AAdirTarjetaPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  item: UTarjetas = {
    key:'',
    codigo:'',
    fecha:'',
    foto:'',
    numero:'',
    numero_codificado:''
  }
  id:string;
  UTarjetasColeccion: AngularFirestoreCollection<UTarjetas>;
  UTarjetasObservable: Observable<UTarjetas[]>;
  displayname:string;
  emails:string;
  tarjetasobj= {} as UTarjetas;
 texto:string;
 textoplus:string;
 
  constructor(private alertservice:AlertasService,private alertCtrl: AlertController,public navCtrl: NavController,private afAuth: AngularFireAuth,private utarjetasser: UTarjetasService) {

    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayname = null;        
        return;
      }
      
      this.emails=user.email;
          
    });
    this.id=this.afAuth.auth.currentUser.uid;
    this.UTarjetasColeccion = this.utarjetasser.getUTarjetasListfromFirestore(this.id);
    this.UTarjetasObservable = this.UTarjetasColeccion.valueChanges();

  }
  AnadirTarjeta(item:UTarjetas){

    this.afAuth.authState.subscribe(user => {
      if (user.isAnonymous) {
        this.alertservice.MostrarAlerta("¡ERROR!","Para empezar a comprar debe inciar sesión");
      }
      else{

        this.texto=this.tarjetasobj.numero;
        var textocod=this.texto.substr(12,16);
        this.textoplus="XXXX XXXX XXXX "+ textocod;
        this.tarjetasobj.numero_codificado=this.textoplus;
        var number= Math.floor(Math.random() * 2) + 1 ;
        
        if(number==1){
             
          this.tarjetasobj.foto="https://firebasestorage.googleapis.com/v0/b/marketplaceturist.appspot.com/o/Tarjetas%2FMatercard.png?alt=media&token=b99ac51d-f182-4415-94a8-9aa48be5d5c9";  
    
        }
        else{
          this.tarjetasobj.foto="https://firebasestorage.googleapis.com/v0/b/marketplaceturist.appspot.com/o/Tarjetas%2FVisa.png?alt=media&token=9e9e3534-2d54-4854-a23b-22e91cc9fcdb";
    
        }
        this.afAuth.authState.subscribe(user => {
          if (!user) {
            this.displayname = null;        
            return;
          }
          
          this.emails=user.email;
              
        });
        this.id=this.afAuth.auth.currentUser.uid;
        try{
          this.utarjetasser.addUTarjetas(item,this.id).then(ref=>{
      });
      let alert = this.alertCtrl.create({
        title: 'CORECTO',
        subTitle: '¡Se ha añadido la tarjeta Correctamente!',
        buttons: ['Aceptar']
    
        
      });
      alert.present();
        }
        catch(e)
        {
          let alert2 = this.alertCtrl.create({
            title: 'ERROR',
            subTitle: 'Ha habido un problema al agregar tu tarjeta',
            buttons: ['Aceptar']
      
            
          });
          alert2.present();
        }
    
      }
    });
    
    


  }
  
  
}
