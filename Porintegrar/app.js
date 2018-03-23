
//Funcionalidad de Javascript 

var express = require("express");
var app = express();


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');
app.get('/about', function (req, res)
{
    res.render('about.html');
});


app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});


app.get("/:firstPart/:secondPart", function(req, res){
    var firstPart = req.params.firstPart;
    var secondPart = req.params.secondPart;x
    
    if(firstPart === "MiADN"){
        var answer = "";
        switch(secondPart){
            case "Myperfil": 
            answer = "'Modica tu perfil'";
            break;

            case "myWallet": 
                answer = "'You have  x in your wallet'";
                break;

            case "MyInfo":
                answer = "'Your NDA '";
                break;
            case "MyDashboard":
                answer = "'See who see your information!'";
                break;

            case "MyDashboard":
                answer = "'See who see your information!'";
                break;
            case "MyToken":
                answer = "'See who see your information!'";
                break;
           
            default:
                answer = "Sorry we don't have that sound right now :(";
        }
           res.send(answer);
    } else {
        res.send("Sorry, page not found... What are you doing with your life?");
    }
});

app.get("*", function(req, res){
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.get("/registro" , function(req, res){
    res.render("index");
});

app.listen(3000, function(){
    console.log("Now serving your app!");
});

/*
Add CommentCollapse 
Message Input


Message @Misa

*bold* _italics_ ~strike~ `code` ```preformatted``` >quote
All File Types 

Include:
everything
All
Messages
Files
All File Types 
65 Files

ShareMore actions Star
*/