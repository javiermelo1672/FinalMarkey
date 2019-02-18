import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import {AngularFirestoreCollection } from '@angular/fire/firestore';
import { NoticiasService } from '../../services/NoticiasService/noticias_service';
import { Noticias} from '../../models/Noticias/Noticias';

@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html'
})
export class NoticiasPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  item: Noticias = {
    descripcion:'',
    fechapub:'',
    foto:'',
    titulo:''    
  }
  NoticiasColeccion: AngularFirestoreCollection<Noticias>;
  NoticiasObservable: Observable<Noticias[]>;
  constructor(public navCtrl: NavController,private noticiasser: NoticiasService) {
    this.NoticiasColeccion = this.noticiasser.getNoticia();
    this.NoticiasObservable = this.NoticiasColeccion.valueChanges();
  }
  
}
