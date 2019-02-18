import {Injectable} from '@angular/core';
import { AlertController } from 'ionic-angular';


@Injectable()
export class AlertasService {


   
    constructor(private alertCtrl: AlertController){}

    MostrarAlerta(titulo:string,subtitulo:string)
    {
        let alert = this.alertCtrl.create({
            title: titulo,
            subTitle: subtitulo,
            buttons: ['Aceptar']
    
            
          });
          return alert.present();
    }
    
}