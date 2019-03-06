import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Paquetes } from './../../models/Proveedor/Paquetes';
import { PaquetesService } from '../../services/Proveedores/paquetes_service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection} from '@angular/fire/firestore';
import { Proveedor } from './../../models/Proveedor/Proveedor';
import {AlertasService} from '../../services/Native_Services/Alertas/alertas_service';


/**
 * Generated class for the EdicionGpaquetePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edicion-gpaquete',
  templateUrl: 'edicion-gpaquete.html',
})
export class EdicionGpaquetePage {
 

  public isToggled: boolean;
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
  paquetesobj:Paquetes;
  key:string;
  paquetess:Paquetes[];
  PaquetesColeccion: AngularFirestoreCollection<Paquetes>;
  PaquetesObservable: Observable<Paquetes[]>;

  paq={} as Paquetes;

  constructor(private alertservice:AlertasService,public navCtrl: NavController, public navParams: NavParams,private paquetesser: PaquetesService) {

    this.paquetesobj=this.navParams.get('item');
    this.paq=this.navParams.get('item');
    this.key=this.paquetesobj.keyid;
    console.log(this.paquetesobj);
    this. PaquetesColeccion = this.paquetesser.getSpecificPaquete(this.paquetesobj.proveedorid,this.paquetesobj.keyid);

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
       
      this.paquetesser.updatePaquete(paq,this.paquetesobj.keyid,this.paquetesobj.proveedorid);
       
      this.alertservice.MostrarAlerta("¡CORRECTO!","Se ha Editado el paquete correctamente");
       
       
     
    
      }
      catch(e){
       this.alertservice.MostrarAlerta("¡ERROR!","Verifique la Información");
  
 
 }
  }

  Accionar()
  {
   
    if(this.isToggled==true){
      this.paquetesser.UpdateConection(this.paquetesobj.proveedorid,"Disponible",this.paquetesobj.keyid);
      
    }
    else if(this.isToggled==false)
    {
      this.paquetesser.UpdateConection(this.paquetesobj.proveedorid,"No Disponible",this.paquetesobj.keyid);
    }
   
   
  }

}
