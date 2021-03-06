const express = require('express'),
    app = express(),
    session = require('express-session'),
    http = require('http');
    server = http.createServer(app),
    bodyParser = require('body-parser');
const scout = require('./models/scout');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));  
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: "secreto-key",
    resave: false,
    saveUninitialized: false    
}));

const scoutRoutes = require('./routes/scoutRoutes');
const playerRoutes = require('./routes/playerRoutes');

app.get("/", (req,res) => {
    if(req.session.uuid){
        res.redirect("/player")
    }else{
        scout.model.findAll().then(scout =>{
            res.render("index", {scout:scout});
        }).catch(err => {
            console.log(err);
        })
    }

})

app.get("/logout", (req,res)=>{
    req.session.destroy();
    res.redirect("/");
})


app.use('/scout', scoutRoutes);
app.use('/player', playerRoutes);

server.listen(8080, () => console.log("8080 is the port friends"));