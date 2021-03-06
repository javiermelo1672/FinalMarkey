import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuarios} from '../../models/Usuario/Usuarios';

@Injectable()
export class UserService {
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
    getspecificUserListfromFirestore(id)
    {
      return this.ds.collection<Usuarios>("/Usuarios/"+id+"/informacion");
    }
    getAtributes(id)
    {
        return this.ds.collection<Usuarios>("/Usuarios/"+id);
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
    addUser(item:Usuarios,id)
    {
        

        
        return this.ds.collection("/Usuarios/"+id+"/informacion").doc("1").set(item) &&
        
        this.ds.doc("/Usuarios/"+id).set({
            estado: "Habilitado",
            tipo:"Cliente Turiscol"
        });
    }

    //Editar el estado de la mesa 
    editUser(item:Usuarios,id)
    {
        
        this.ds.collection("/Usuarios/"+id+"/informacion/1").doc(id).update(item);
    }

    
}
