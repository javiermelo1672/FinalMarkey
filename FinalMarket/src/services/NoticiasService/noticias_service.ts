import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Noticias} from '../../models/Noticias/Noticias';
@Injectable()
export class NoticiasService {
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
    getNoticia()
    {
      return this.ds.collection<Noticias>("/Noticias/");
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
    addNoticia(item:Noticias)
    {
        const pushkey = this.ds.createId();
        return this.ds.collection("/Noticias/").doc(pushkey).set(item);
    }

    //Editar el estado de la mesa 
    editNoticia(item:Noticias,id)
    {
        
        this.ds.collection("/Noticias/").doc(id).update(item);
    }
    removeNoticia(id){

        this.ds.collection("/Noticias/").doc(id).delete();
    }

    
}
