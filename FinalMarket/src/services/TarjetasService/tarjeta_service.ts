import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {UTarjetas} from '../../models/Usuario/UTarjetas';
@Injectable()
export class UTarjetasService {
    constructor(private ds:AngularFirestore){}
    
    /*

    getMesaListfromFirestore()
    {
      return this.ds.collection<Usuarios>("/restaurantes/1/sedes/1/mesasdinny/",ref=>ref.orderBy('nombre'));
    }
  

   /* getMesaListWithFilter(Filtro)
    {
        return this.ds.collection<MesasFireStoreModel>("/restaurantes/1/sedes/1/mesasdinny/",ref=>ref.where('estado','==',Filtro));
    }
*/
    getUTarjetasListfromFirestore(id)
    {
      return this.ds.collection<UTarjetas>("/Usuarios/"+id+"/tarjetas");
    }
    
    /*
    getEstadoMesasfromFirestore()
    {
        return this.ds.collection<EstadoMesasFireStoreModel>("estadomesasdinny");
    }
    
    getEspecificEstadofromFirestore(Estado)
    {
        return this.ds.collection<EstadoMesasFireStoreModel>("estadomesasdinny", ref=>ref.where('estados','==',String(Estado)));
    }
*/
    addUTarjetas(item:UTarjetas,id)
    {
        const pushkey = this.ds.createId();
        return this.ds.collection("/Usuarios/"+id+"/tarjetas").doc(pushkey).set(item);
    }



    
}