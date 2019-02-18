import { Paquetes } from './../../models/Proveedor/Paquetes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PaquetesService} from '../../services/Proveedores/paquetes_service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import {UTarjetasService} from '../../services/TarjetasService/tarjeta_service';
import { UTarjetas } from './../../models/Usuario/UTarjetas';
import { AngularFireAuth } from "@angular/fire/auth";
/**
 * Generated class for the DetallepaquetePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detallepaquete',
  templateUrl: 'detallepaquete.html',
})
export class DetallepaquetePage {
// should be each tab's root Page
item: Paquetes = {
  fecha_fin:'',
  fecha_inicio:'',
  cantidaddisponible:0,
  cantidadp:'',
  codigodescuento:'',
  descripcion:'',
  descuento:'',
  estado:'',
  foto:'',
  keyid:'',
  nombre:'',
  precio:'',
  proveedorid:'',
  tipodepago:''
}
items: UTarjetas = {
  key:'',
  codigo:'',
  fecha:'',
  foto:'',
  numero:'',
  numero_codificado:''
}
UTarjetasColeccion: AngularFirestoreCollection<UTarjetas>;
  UTarjetasObservable: Observable<UTarjetas[]>;
paquetesobj:Paquetes;
PaquetesColeccion: AngularFirestoreCollection<Paquetes>;
PaquetesObservable: Observable<Paquetes[]>;
displayname:string;
  emails:string;
  id:string;
constructor(private utarjetasser: UTarjetasService, private afAuth: AngularFireAuth,public navParams: NavParams,public navCtrl: NavController,private paqueteserobj:PaquetesService) {
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
  this.paquetesobj=this.navParams.get('item');
  console.log(this.paquetesobj.proveedorid);
  console.log(this.paquetesobj.keyid);
 this.PaquetesColeccion=this.paqueteserobj.getSpecificPaquete(this.paquetesobj.proveedorid,this.paquetesobj.keyid);
 console.log(this.paquetesobj);
 
  this.PaquetesObservable=this.PaquetesColeccion.valueChanges();

  console.log(this.PaquetesObservable);
}

}
