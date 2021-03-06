import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection} from '@angular/fire/firestore';
import { PromocionesService } from '../../services/PromocionesService/promociones_service';
import { Promociones} from '../../models/Promociones/Promociones';
import { Proveedor } from './../../models/Proveedor/Proveedor';
import { ProveedoresService } from '../../services/Proveedores/proveedores_service';
import { AngularFireAuth } from "@angular/fire/auth";
import {AlertasService} from '../../services/Native_Services/Alertas/alertas_service';

@Component({
  selector: 'page-a-adir-proveedor',
  templateUrl: 'a-adir-proveedor.html'
})
export class AAdirProveedorPage {

 prov= {} as Proveedor;
  proveedores:Proveedor[];
  item:Proveedor = {
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
  displayname:string;
  emails:string;
  id:string;
  constructor(private alertservice:AlertasService,private afAuth: AngularFireAuth,public navCtrl: NavController,private promocionesser: PromocionesService,private proveedorsser: ProveedoresService) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayname = null;        
        return;
      }
      
      this.emails=user.email;
          
    });
    this.id=this.afAuth.auth.currentUser.uid;
    console.log(this.id);
    this.ProveedorColeccion = this.proveedorsser.getSpecificProvedor(this.id);
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
  
  Anadirproveedor(prov:Proveedor){

    try{


        
      
     prov.id_user=this.id;
     prov.estado_sesion="Habilitado";
     prov.estado_solicitudes="No Disponible";
    

      
     this.proveedorsser.addProveedor(prov);
      
     this.alertservice.MostrarAlerta("¡CORRECTO!","Se ha añadido el proveedor correctamente");
      
      
    
   
     }
     catch(e){
      this.alertservice.MostrarAlerta("¡ERROR!","Verifique la Información");
 

}

  }
  
}
