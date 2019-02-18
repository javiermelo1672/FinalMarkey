import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

const cors = require('cors')({origin: true});



exports.autentifyuser = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
    var db = admin.firestore();
    const key=req.query.ids;
        

    
  db.collection("/Usuarios/").doc(key).get().then(
      function(doc){
       
        var Str;
        if( doc.exists){
            Str = JSON.stringify(doc.data());
        }
            console.log(Str);
            res.send(Str);
            return Str;
        }
    
    ).catch(reason => {
        res.send(reason);
        
        console.log(reason);
        return reason;
    });    
      
    });
});

exports.autentifycode = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
    var db = admin.firestore();
    const key=req.query.ids;
    const code=req.query.codigo;    
    var newelement={ "id":"","codigo":""};
   
    db.collection("/Usuarios/").doc(key).collection("/informacion").get().then(snapshot =>{
        
        snapshot.forEach(doc =>{
            
            newelement = {
                "id": doc.id,
                "codigo": doc.data().codigo
            }

            console.log(newelement);
            
            
        });
        
        if(code==newelement.codigo){
            console.log("True");
            return true;
        }
        else{
            console.log("False");
            return false;
        }
        }
        
        
        ).catch(reason => {
        res.send(reason);
        
        console.log(reason);
        return reason;
    });    
      
    });
});






