const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var serviceAccount = require("./key");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mi-proyecto-d0d82.firebaseio.com"
});

var db = admin.database()
const ref = db.ref('genobank');


//Crear Usuario
app.post('/users/save',(req,res)=>{
    var db = admin.database()
    var usersRef = ref.child('users')
    var post = req.body

usersRef.push(req.body) //El punto Push genera un ID unico 
    
res.send('Todo Chido')
});


//Actualizar Cuenta
app.post('/users/save',(req,res)=>{
    var db = admin.database()
    var usersRef = ref.child('users')
    var post = req.body

usersRef.update(req.body) 
    
res.send('Todo Chido')
});


//Buscar usuario por "user"
app.get('/users/get/:search/',(req,res)=>{
    var userRef = ref.child ('users').orderByChild("user").equalTo(req.params.search)
       userRef.on("value",(snapshot)=>{
        var obj = snapshot.val()
        if (obj === null){
        res.status(404).send("No existe el usuario")
        }else{
            res.send(snapshot.val())
        }
    });
});





app.listen(3000,() => {
    console.log(`Magic happens in port 3000!`)
});