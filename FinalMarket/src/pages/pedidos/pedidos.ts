import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {IniciarSesiNPage} from '../../pages/iniciar-sesi-n/iniciar-sesi-n';
import { AngularFireAuth } from "@angular/fire/auth";
import{PedidosService} from '../../services/Proveedores/pedidos_service';
import { Pedidos} from '../../models/Proveedor/Pedidos';
import { Observable } from 'rxjs/Observable';
import {AngularFirestoreCollection} from '@angular/fire/firestore';

@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html'
})
export class PedidosPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

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
  displayname:string;
  emails:string;
  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth,private pedidosser: PedidosService) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayname = null;        
        return;
      }
      
      this.emails=user.email;
          
    });
    this.id=this.afAuth.auth.currentUser.uid;
    this.PedidosColeccion = this.pedidosser.getUserPedidos(this.id);
    this.PedidosObservable = this.PedidosColeccion.valueChanges();
  }
  
}
