import { Paquetes } from './../../models/Proveedor/Paquetes';
import { PaquetesService } from '../../services/Proveedores/paquetes_service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection} from '@angular/fire/firestore';
import { Proveedor } from './../../models/Proveedor/Proveedor';
import {AlertasService} from '../../services/Native_Services/Alertas/alertas_service';

/**
 * Generated class for the EditarpaquetessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editarpaquetess',
  templateUrl: 'editarpaquetess.html',
})
export class EditarpaquetessPage {
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
  paquetess:Paquetes[];
  PaquetesColeccion: AngularFirestoreCollection<Paquetes>;
  PaquetesObservable: Observable<Paquetes[]>;

  paq={} as Paquetes;

  constructor(private alertservice:AlertasService,public navCtrl: NavController, public navParams: NavParams,private paquetesser: PaquetesService) {

    this.paquetesobj=this.navParams.get('item');
    this.key=this.paquetesobj.keyid;
    console.log(this.paquetesobj);
    this. PaquetesColeccion = this.paquetesser.getPaquetes(this.key);

    this.PaquetesColeccion.snapshotChanges().subscribe(restauranteLista=>{
      this.paquetess=restauranteLista.map(paquete=>{
        return{
          
            fecha_fin:paquete.payload.doc.data().fecha_fin,
            fecha_inicio:paquete.payload.doc.data().fecha_inicio,
            cantidaddisponible:paquete.payload.doc.data().cantidaddisponible,
            cantidadp:paquete.payload.doc.data().cantidadp,
            codigodescuento:paquete.payload.doc.data().codigodescuento,
            descripcion:paquete.payload.doc.data().descripcion,
            descuento:paquete.payload.doc.data().descuento,
            estado:paquete.payload.doc.data().estado,
            foto:paquete.payload.doc.data().foto,
            keyid:paquete.payload.doc.data().keyid,
            nombre:paquete.payload.doc.data().nombre,
            precio:paquete.payload.doc.data().precio,
            proveedorid:paquete.payload.doc.data().proveedorid,
            tipodepago:paquete.payload.doc.data().tipodepago,
            id:paquete.payload.doc.id
          
         
          
        }
      });
    });

    this. PaquetesObservable = this. PaquetesColeccion.valueChanges();
  }

  AnadirPaquete(paq:Paquetes){
    try{


      
      paq.cantidaddisponible=Number(paq.cantidaddisponible);
      paq.proveedorid=this.paquetesobj.keyid;
      paq.tipodepago="Tarjeta";
      paq.estado="Disponible";
     
 
       
      this.paquetesser.addPaquetes(paq,this.paquetesobj.keyid);
       
      this.alertservice.MostrarAlerta("¡CORRECTO!","Se ha añadido el paquete correctamente");
       
       
     
    
      }
      catch(e){
       this.alertservice.MostrarAlerta("¡ERROR!","Verifique la Información");
  
 
 }
  }

}
