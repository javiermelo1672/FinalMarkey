import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {IniciarSesiNPage} from '../../pages/iniciar-sesi-n/iniciar-sesi-n';
import { AngularFireAuth } from "@angular/fire/auth";
import{UserService} from '../../services/UserService.ts/user_service';
import { Usuarios} from '../../models/Usuario/Usuarios';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AAdirTarjetaPage } from '../../pages/a-adir-tarjeta/a-adir-tarjeta';
import { Http, RequestOptions, URLSearchParams} from '@angular/http';
import {AlertasService} from '../../services/Native_Services/Alertas/alertas_service';
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  item: Usuarios = {
    edad:'',
    foto:'',
    nombre:'',
    num_Documento:'',
    sexo:'',
    telefono:''
  }
  id:string;
  UserColeccion: AngularFirestoreCollection<Usuarios>;
  UserObservable: Observable<Usuarios[]>;
  displayname:string;
  emails:string;
  constructor(private alertservice:AlertasService,public http: Http,public navCtrl: NavController,private afAuth: AngularFireAuth,private usuariosser: UserService) {

    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayname = null;        
        return;
      }
      
      this.emails=user.email;
          
    });
    this.id=this.afAuth.auth.currentUser.uid;
    this.UserColeccion = this.usuariosser.getspecificUserListfromFirestore(this.id);
    this.UserObservable = this.UserColeccion.valueChanges();


    let params: URLSearchParams = new URLSearchParams();
    params.set('id',this.id);
    params.set('codigo',"1672");
 
    let requestOptions = new RequestOptions();
    requestOptions.search = params;
    this.http.get('https://us-central1-marketplaceturist.cloudfunctions.net/autentifycode',requestOptions).toPromise().then(
          function(response)
            {}).catch(error=> this.alertservice.MostrarAlerta("¡Algo ha salido mal!","Error de Google Cloud Functions"));
  }
  
  goToIniciarSesiN()
  {
    this.afAuth.auth.signOut();
  }
  goTotarjeta()
  {
    this.navCtrl.push(AAdirTarjetaPage);
  }
}
