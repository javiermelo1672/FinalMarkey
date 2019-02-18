import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Promociones} from '../../models/Promociones/Promociones';
@Injectable()
export class PromocionesService {
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
    getPromocion()
    {
      return this.ds.collection<Promociones>("/Promociones/", ref=>ref.where('estado','==','Disponible'));
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
    addPromocion(item:Promociones)
    {
        const pushkey = this.ds.createId();
        return this.ds.collection("/Promociones/").doc(pushkey).set(item);
    }

    //Editar el estado de la mesa 
    editPromocion(item:Promociones,id)
    {
        
        this.ds.collection("/Promociones/").doc(id).update(item);
    }
    removePromocion(id){

        this.ds.collection("/Promociones/").doc(id).delete();
    }

    
}
