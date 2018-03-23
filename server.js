const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var serviceAccount = require("/home/ron/Documents/Batch18/Firebase/cintaroja-377d6-firebase-adminsdk-6631r-1732700daa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cintaroja-377d6.firebaseio.com"
});

var db = admin.database()
const ref = db.ref('genobank');


//Crear Usuario
app.post('/users/save',(req,res)=>{
    var db = admin.database()
    var usersRef = ref.child('users')
usersRef.push(req.body)
 //El punto Push genera un ID unico 
    
res.send('Todo Chido')
});


//Buscar usuario por "user"
app.get('/users/search/:user/',(req,res)=>{
    let userRef = ref.child ('users').orderByChild("user").equalTo(req.params.user)
       userRef.on("value",(snapshot)=>{
        let obj = snapshot.val()
        if (obj === null){
        res.status(404).send("No existe el usuario")
        }else{
            res.send(snapshot.val())
        }
    });
});



//loguear usuario 
app.post('/users/login/:user/',(req,res)=>{
    let userRef = ref.child ('users').orderByChild("user").equalTo(req.params.user)
       userRef.on("value",(snapshot)=>{
        let obj = snapshot.val()
        let id = Object.keys(obj)[0]
        let contraseña = (obj[id].password)
        let clave = req.body.password
        if (obj === null){
        res.status(404).send("No existe el usuario")
        }else{ if (clave == contraseña){
            res.send(obj)}else{
                res.send("El Usuario o la Contraseña son incorrectos")
            }
            
        }
    });
});

//Buscar usuario por "nacionality"
app.get('/users/search/nacionality/:search/',(req,res)=>{
    let userRef = ref.child ('users').orderByChild("nacionality").equalTo(req.params.search)
       userRef.on("value",(snapshot)=>{
        let obj = snapshot.val()
        if (obj === null){
        res.status(404).send("No existen usuarios con nacionalidad de " + req.params.search)
        }else{
            res.send(snapshot.val())
        }
    });
});

//Buscar usuario por "country"
app.get('/users/search/country/:search/',(req,res)=>{
    let userRef = ref.child ('users').orderByChild("country").equalTo(req.params.search)
       userRef.on("value",(snapshot)=>{
        let obj = snapshot.val()
        if (obj === null){
        res.status(404).send("No existen usuarios del pais " + req.params.search)
        }else{
            res.send(snapshot.val())
        }
    });
});

//Buscar usuario por "gender"
app.get('/users/search/gender/:search/',(req,res)=>{
    let userRef = ref.child ('users').orderByChild("gender").equalTo(req.params.search)
       userRef.on("value",(snapshot)=>{
        let obj = snapshot.val()
        if (obj === null){
        res.status(404).send("No existen usuarios de genero " + req.params.search )
        }else{
            res.send(snapshot.val())
        }
    });
});



//Actualizar Cuenta
app.post('/users/pay/:user/',(req,res)=>{
    
    var db = admin.database()
    let userRef = ref.child ('users').orderByChild("user").equalTo(req.params.user)
       userRef.once("value",(snapshot)=>{
        let obj = snapshot.val()
        let id = Object.keys(obj)[0]
        let count = (obj[id].money)
        ref.child ('users').child(id).update({
            money:count+1
        })
    }) 
res.send('Todo Chido')
});


app.listen(3000,() => {
    console.log(`Magic happens in port 3000!`)
});
