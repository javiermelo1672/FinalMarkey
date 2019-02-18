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




