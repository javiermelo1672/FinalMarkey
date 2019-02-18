import { Paquetes } from './../../models/Proveedor/Paquetes';
import { PaquetesService } from '../../services/Proveedores/paquetes_service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection} from '@angular/fire/firestore';
import { Proveedor } from './../../models/Proveedor/Proveedor';

/**
 * Generated class for the PaquetesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paquetes',
  templateUrl: 'paquetes.html',
})
export class PaquetesPage {

  item: Paquetes = {
    fecha_fin:'',
    fecha_inicio:'',
    cantidaddisponible:null,
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
  paquetesobj:Proveedor;
  key:string;
  PaquetesColeccion: AngularFirestoreCollection<Paquetes>;
  PaquetesObservable: Observable<Paquetes[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private paquetesser: PaquetesService) {

    this.paquetesobj=this.navParams.get('item');
    this.key=this.paquetesobj.keyid;
    console.log(this.paquetesobj);
    this. PaquetesColeccion = this.paquetesser.getPaquetes(this.key);
    this. PaquetesObservable = this. PaquetesColeccion.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaquetesPage');
  }

}
