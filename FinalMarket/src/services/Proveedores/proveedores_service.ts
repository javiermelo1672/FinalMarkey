
import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Proveedor} from '../../models/Proveedor/Proveedor';
@Injectable()
export class ProveedoresService {
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
    getProveedor()
    {
      return this.ds.collection<Proveedor>("/Proveedores/", ref=>ref.where('estado_solicitudes','==','Disponible'));
    }

    getSpecificProvedor(id){

        return this.ds.collection<Proveedor>("/Proveedores/", ref=>ref.where('id_user','==',id));

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
    addProveedor(item:Proveedor)
    {
        const pushkey = this.ds.createId();
        return this.ds.collection("/Proveedores/").doc(pushkey).set(item);
    }

    //Editar el estado de la mesa 
    editProveedor(item:Proveedor,id)
    {
        
        this.ds.collection("/Proveedores/").doc(id).update(item);
    }
    removeProveedor(id){

        this.ds.collection("/Proveedores/").doc(id).delete();
    }

    
}
