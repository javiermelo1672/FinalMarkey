import { Paquetes } from './../../models/Proveedor/Paquetes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PaquetesService} from '../../services/Proveedores/paquetes_service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
@Component({
  selector: 'page-detalle-paquete',
  templateUrl: 'detalle-paquete.html'
})
export class DetallePaquetePage {
  // this tells the tabs component which Pages
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
  paquetesobj:Paquetes;
  PaquetesColeccion: AngularFirestoreCollection<Paquetes>;
  PaquetesObservable: Observable<Paquetes[]>;
  constructor( public navParams: NavParams,public navCtrl: NavController,private paqueteserobj:PaquetesService) {

    this.paquetesobj=this.navParams.get('item');
   // this.PaquetesColeccion=this.paqueteserobj.getSpecificPaquete(this.paquetesobj.proveedorid,this.paquetesobj.keyid);
   console.log(this.paquetesobj);
   
    //this.PaquetesObservable=this.PaquetesColeccion.valueChanges();
  }
  
}
