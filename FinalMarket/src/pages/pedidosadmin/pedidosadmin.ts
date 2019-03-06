import { Proveedor } from './../../models/Proveedor/Proveedor';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import {IniciarSesiNPage} from '../../pages/iniciar-sesi-n/iniciar-sesi-n';
import { AngularFireAuth } from "@angular/fire/auth";
import{PedidosService} from '../../services/Proveedores/pedidos_service';
import { Pedidos} from '../../models/Proveedor/Pedidos';
import { Observable } from 'rxjs/Observable';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import { ProveedoresService } from '../../services/Proveedores/proveedores_service';

/**
 * Generated class for the PedidosadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidosadmin',
  templateUrl: 'pedidosadmin.html',
})
export class PedidosadminPage {
  public isToggled: boolean;
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
  item: Pedidos = {
    cantidadr:'',
    clienteid:'',
    descuento:'',
    estado:'',
    foto:'',
    nombre:'',
    pago:'',
    precio:'',
    proveedorid:'',
  }
  id:string;
  PedidosColeccion: AngularFirestoreCollection<Pedidos>;
  PedidosObservable: Observable<Pedidos[]>;
  pedidosobj:Proveedor;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,private pedidosser: PedidosService,private proveedorsser: ProveedoresService) {
    this.pedidosobj=this.navParams.get('item');
    this.id=this.pedidosobj.keyid;
    console.log(this.id);
    this.PedidosColeccion = this.pedidosser.getProveedor(this.id);
    this.PedidosObservable = this.PedidosColeccion.valueChanges();


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

  Accionar()
  {
    this.id=this.pedidosobj.keyid;
    if(this.isToggled==true){
      this.proveedorsser.UpdateConection(this.id,"Disponible");
    }
    else if(this.isToggled==false)
    {
      this.proveedorsser.UpdateConection(this.id,"No Disponible");
    }
   
   
  }

}
