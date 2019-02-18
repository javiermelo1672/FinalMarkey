import { Proveedor } from './../../models/Proveedor/Proveedor';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection} from '@angular/fire/firestore';
import { PromocionesService } from '../../services/PromocionesService/promociones_service';
import { Promociones} from '../../models/Promociones/Promociones';

import { ProveedoresService } from '../../services/Proveedores/proveedores_service';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  items:Promociones = {
    codigopromocion: ' ',
    condiciones:' ',
    descripcion: '',
    estado:'',
    fecha_vo:'',
    foto:'',
    nombre:''  
  }
  PromocionesColeccion: AngularFirestoreCollection<Promociones>;
  PromocionesObservable: Observable<Promociones[]>;

  proveedores:Proveedor[];
  item:Proveedor = {
    descripcion:'',
    estado_sesion:'',
    estado_solicitudes:'',
    foto:'',
    keyid:'',
    nit:'',
    nombre:'',
    telefono:'' 
  }
  ProveedorColeccion: AngularFirestoreCollection<Proveedor>;
  ProveedorObservable: Observable<Proveedor[]>;
  constructor(public navCtrl: NavController,private promocionesser: PromocionesService,private proveedorsser: ProveedoresService) {
    this.PromocionesColeccion = this.promocionesser.getPromocion();
    this.PromocionesObservable = this.PromocionesColeccion.valueChanges();
    this.ProveedorColeccion = this.proveedorsser.getProveedor();
    this.ProveedorColeccion.snapshotChanges().subscribe(restauranteLista=>{
      this.proveedores=restauranteLista.map(proveedor=>{
        return{
          
          descripcion:proveedor.payload.doc.data().descripcion,
          estado_sesion:proveedor.payload.doc.data().estado_sesion,
          estado_solicitudes:proveedor.payload.doc.data().estado_solicitudes,
          foto:proveedor.payload.doc.data().foto,
          keyid:proveedor.payload.doc.data().keyid,
          nit:proveedor.payload.doc.data().nit,
          nombre:proveedor.payload.doc.data().nombre,
          telefono:proveedor.payload.doc.data().telefono,
          id:proveedor.payload.doc.id 
          
        }
      });
    });
    this.ProveedorObservable = this.ProveedorColeccion.valueChanges();

  
  }
  
}
