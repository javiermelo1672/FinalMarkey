import { InicioPage } from './../inicio/inicio';
import { PedidosService } from './../../services/Proveedores/pedidos_service';
import { Pedidos } from './../../models/Proveedor/Pedidos';
import { Paquetes } from './../../models/Proveedor/Paquetes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PaquetesService} from '../../services/Proveedores/paquetes_service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import {UTarjetasService} from '../../services/TarjetasService/tarjeta_service';
import { UTarjetas } from './../../models/Usuario/UTarjetas';
import { AngularFireAuth } from "@angular/fire/auth";
import { IfStmt } from '@angular/compiler';
import {AlertasService} from '../../services/Native_Services/Alertas/alertas_service';


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
paquetess:Paquetes[];
UTarjetasColeccion: AngularFirestoreCollection<UTarjetas>;
UTarjetasObservable: Observable<UTarjetas[]>;
paquetesobj:Paquetes;
PaquetesColeccion: AngularFirestoreCollection<Paquetes>;
PaquetesObservable: Observable<Paquetes[]>;
displayname:string;
  emails:string;
  id:string;

  pedidost= {} as Pedidos;
constructor(private alertservice:AlertasService,private pedidosser:PedidosService,private utarjetasser: UTarjetasService, private afAuth: AngularFireAuth,public navParams: NavParams,public navCtrl: NavController,private paqueteserobj:PaquetesService) {
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

  
  console.log(this.PaquetesObservable);
}

ComprarPaquete(pedidost:Pedidos){

try{

  if(this.paquetesobj.descuento=="Sin Descuento")
  {
    var precio= Number(this.paquetesobj.precio);
    var cn=Number(pedidost.cantidadr);
    var total=precio*cn;
    var totalstr=String(total);

    
    this.pedidost.precio=totalstr;
    this.pedidost.foto=this.paquetesobj.foto;
    this.pedidost.nombre=this.paquetesobj.nombre;
    this.pedidost.clienteid=this.id;
    this.pedidost.proveedorid=this.paquetesobj.proveedorid+","+this.paquetesobj.keyid;
    this.pedidost.estado="Pagado";
    this.pedidost.descuento="No Aplicado";
    console.log(this.pedidost);
    this.pedidosser.addPedidos(this.pedidost,this.paquetesobj.proveedorid,this.id);
    this.navCtrl.setRoot(InicioPage);
    this.alertservice.MostrarAlerta("¡Correcto!","Compra Completada satisfactoriamente");

    
  }
  else if(this.paquetesobj.descuento=="2x1")
  {
    if(this.paquetesobj.codigodescuento==this.pedidost.descuento)
    {
      var precio= Number(this.paquetesobj.precio);
      var total=precio;
      var totalstr=String(total);

      var cn=2;
      this.pedidost.cantidadr="2";
      this.pedidost.precio=totalstr;
      this.pedidost.foto=this.paquetesobj.foto;
      this.pedidost.nombre=this.paquetesobj.nombre;
      this.pedidost.clienteid=this.id;
      this.pedidost.proveedorid=this.paquetesobj.proveedorid+","+this.paquetesobj.keyid;
      this.pedidost.estado="Pagado";
    
      console.log(this.pedidost);
      this.pedidosser.addPedidos(this.pedidost,this.paquetesobj.proveedorid,this.id);
      this.navCtrl.setRoot(InicioPage);
      this.alertservice.MostrarAlerta("¡Correcto!","Compra Completada satisfactoriamente");
    }
    else{
      var precio= Number(this.paquetesobj.precio);
      var cn=Number(pedidost.cantidadr);
      var total=precio*cn;
      var totalstr=String(total);

      
      this.pedidost.precio=totalstr;
      this.pedidost.foto=this.paquetesobj.foto;
      this.pedidost.nombre=this.paquetesobj.nombre;
      this.pedidost.clienteid=this.id;
      this.pedidost.proveedorid=this.paquetesobj.proveedorid+","+this.paquetesobj.keyid;
      this.pedidost.estado="Pagado";
    this.pedidost.descuento="No Aplicado";
      console.log(this.pedidost);
      this.pedidosser.addPedidos(this.pedidost,this.paquetesobj.proveedorid,this.id);
      this.navCtrl.setRoot(InicioPage);
      this.alertservice.MostrarAlerta("¡Correcto!","Compra Completada satisfactoriamente");

    }
  }
  else{
    if(this.paquetesobj.codigodescuento==this.pedidost.descuento)
    {
      var precio= Number(this.paquetesobj.precio);
      var total=precio;
      var totalstr=String(total);
        
      var descuento=Number(this.paquetesobj.descuento.substr(0,2));
      var descuentor="0."+String(descuento);
      console.log(descuento);

      var total=(precio-(precio*Number(descuentor)))*Number(this.pedidost.cantidadr);
      this.pedidost.precio=String(total);
     
      this.pedidost.foto=this.paquetesobj.foto;
      this.pedidost.nombre=this.paquetesobj.nombre;
      this.pedidost.clienteid=this.id;
      this.pedidost.proveedorid=this.paquetesobj.proveedorid+","+this.paquetesobj.keyid;
      console.log(this.pedidost);
      this.pedidosser.addPedidos(this.pedidost,this.paquetesobj.proveedorid,this.id);
      this.navCtrl.setRoot(InicioPage);
      this.alertservice.MostrarAlerta("¡Correcto!","Compra Completada satisfactoriamente");
    }
    else{
      var precio= Number(this.paquetesobj.precio);
      var cn=Number(pedidost.cantidadr);
      var total=precio*cn;
      var totalstr=String(total);

      
      this.pedidost.precio=totalstr;
      this.pedidost.foto=this.paquetesobj.foto;
      this.pedidost.nombre=this.paquetesobj.nombre;
      this.pedidost.clienteid=this.id;
      this.pedidost.proveedorid=this.paquetesobj.proveedorid+","+this.paquetesobj.keyid;
      this.pedidost.estado="Pagado";
      this.pedidost.descuento="No Aplicado";
      console.log(this.pedidost);
      this.pedidosser.addPedidos(this.pedidost,this.paquetesobj.proveedorid,this.id);
      this.navCtrl.setRoot(InicioPage);
      this.alertservice.MostrarAlerta("¡Correcto!","Compra Completada satisfactoriamente");
      

    }

  }
}
catch(e){
  this.alertservice.MostrarAlerta("¡Error!","Algo ha fallado intentalo nuevamente");
}
    

      
      

      
}

}
