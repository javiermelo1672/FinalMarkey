
import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Paquetes} from '../../models/Proveedor/Paquetes';
@Injectable()
export class PaquetesService {
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
    getPaquetes(keyid)
    {
      return this.ds.collection<Paquetes>("/Proveedores/"+keyid+"/Paquetes",ref=>ref.where('cantidaddisponible','>=',1).where('estado','==',"Disponible") );
    }


    getSpecificPaquete(keyid,idpaquete)
    {
      return this.ds.collection<Paquetes>("/Proveedores/"+keyid+"/Paquetes",ref =>ref.where('keyid','==',idpaquete));
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
    addPaquetes(item: Paquetes,id)
    {
        const pushkey = this.ds.createId();
        item.keyid=pushkey;
        return this.ds.collection("/Proveedores/"+id+"/Paquetes").doc(pushkey).set(item) ;
    }


    updatePaquete(item:Paquetes,ids,idprove){

        return this.ds.collection("/Proveedores/"+idprove+"/Paquetes").doc(ids).update(item) ;
    }

    UpdateConection(ide:string,text:string,id)
    {
        return this.ds.collection("/Proveedores/"+ide+"/Paquetes").doc(id).update({
            estado: text,
        });
    }
    //Editar el estado de la mesa 
   
    

    
}
