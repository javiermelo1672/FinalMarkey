
import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pedidos} from '../../models/Proveedor/Pedidos';
@Injectable()
export class PedidosService {
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
    getUserPedidos(id)
    {
      return this.ds.collection<Pedidos>("/Usuarios/"+id+"/pedidos");
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
    addPedidos(item: Pedidos)
    {
        const pushkey = this.ds.createId();
        return this.ds.collection("/Proveedores/").doc(pushkey).set(item);
    }

    //Editar el estado de la mesa 
   
    

    
}
