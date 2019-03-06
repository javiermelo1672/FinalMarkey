import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, provideLocationStrategy } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import { ProveedoresService } from '../../services/Proveedores/proveedores_service';
import { Proveedor } from './../../models/Proveedor/Proveedor';
import {AlertasService} from '../../services/Native_Services/Alertas/alertas_service';
/**
 * Generated class for the DetallesproveedorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detallesproveedor',
  templateUrl: 'detallesproveedor.html',
})
export class DetallesproveedorPage {
  proveedores:Proveedor[];
  items:Proveedor = {
    descripcion:'',
    estado_sesion:'',
    estado_solicitudes:'',
    foto:'',
    keyid:'',
    nit:'',
    nombre:'',
    id_user:'',
    telefono:'' 
  }
  ProveedorColeccion: AngularFirestoreCollection<Proveedor>;
  ProveedorObservable: Observable<Proveedor[]>;
  pedidosobj:Proveedor;
  id:string;
  prov= {} as Proveedor;
  provid:string;
  constructor(private alertservice:AlertasService,public navCtrl: NavController, public navParams: NavParams,private proveedorsser: ProveedoresService) {
   
    this.prov=this.navParams.get('item');
    this.pedidosobj=this.navParams.get('item');
    this.id=this.pedidosobj.keyid;
    
    this.ProveedorColeccion = this.proveedorsser.getSpecificonlyProvedor(this.id);
    this.ProveedorColeccion.snapshotChanges().subscribe(restauranteLista=>{
      this.proveedores=restauranteLista.map(proveedor=>{
        return{
          
          descripcion:proveedor.payload.doc.data().descripcion,
          estado_sesion:proveedor.payload.doc.data().estado_sesion,
          estado_solicitudes:proveedor.payload.doc.data().estado_solicitudes,
          foto:proveedor.payload.doc.data().foto,
          keyid:proveedor.payload.doc.data().keyid,
          nit:proveedor.payload.doc.data().nit,
          id_user:proveedor.payload.doc.data().id_user,
          nombre:proveedor.payload.doc.data().nombre,
          telefono:proveedor.payload.doc.data().telefono,
          id:proveedor.payload.doc.id 
          
        }
      });
    });
    this.ProveedorObservable = this.ProveedorColeccion.valueChanges();
  }

  EditarProveedor(prov:Proveedor){

    try{


        
      
   
      
     this.provid=prov.keyid;
 
       
      this.proveedorsser.editProveedor(prov,this.provid);
       
      this.alertservice.MostrarAlerta("¡CORRECTO!","Se ha editado correctamente el Proveedor");
       
       
     
    
      }
      catch(e){
       this.alertservice.MostrarAlerta("¡ERROR!","Verifique la Información");
  
 
 }
 

  }

  
}
