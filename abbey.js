const express = require("express");
const bodyParser = require("body-parser");
const LocalStorage = require("node-localstorage").LocalStorage;
const PouchDB = require("pouchdb");
const User = require("./User");
const session = require("express-session");

const port = 1810;
const environment = "production";
let etc = new LocalStorage("./localStorage/etc");
const app = express();

const userDB = new PouchDB("users");

userDB.info().then(function (info) {
    console.log("INFO", info);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({name:'abbeyUser',secret:'AbbeyIsFun',cookie:{maxAge:6000}, resave:false,saveUninitialized: true}));

app.set("environment", environment);
etc.setItem("environment", app.get("environment"));

app.listen(port, () => {
    console.log("Listening on port " + port + "...");
});

app.get("/", (request, response, next) => {
    console.log("USER",request.session.abbeyUser);
    next();
});

app.get("/login", (request, response) => {
    response.sendFile(__dirname + "/web/login.html");
});

app.post("/login", (request, response) =>{
    const potentialUser = request.body.user;
    console.log("POTENTIAL USER", potentialUser);

    userDB.get(potentialUser.username).then(function (user) {
        let foundUser = undefined;
        console.log("POTENTIAL USERS", user);

        if (user.password === potentialUser.password){
            foundUser = user;
        }

        request.session.abbeyUser = foundUser;
        response.end(JSON.stringify(foundUser));

    }).catch(function (error) {
        console.log("ERROR:", error)
    });
});


app.get("/log-in", (request, response) => {
    const potentialUser = request.body.user;
    console.log("POTENTIAL USER", potentialUser);

   userDB.get(potentialUser.username).then(function (user) {
       let foundUser = undefined;
        console.log("POTENTIAL USERS", user);

        if (user.password === potentialUser.password){
               foundUser = user;
        }

        response.json(foundUser);

    }).catch(function (error) {
        console.log("ERROR:", error)
    });

   /*userDB.destroy().then(function(success){
       console.log(success);
   }).catch(function(error){console.log(error)});*/
   });

app.post("/registering", (request, response) => {

    let player = request.body;

    const user = new User(player.playerName, player.password, player.playerGendre, player.coins, player.reputation);

    console.log("REQUEST", user.toJSON());
    userDB.put(user.toJSON());

    response.redirect("/");
});

app.post("/passwordchange", (request, response) => {
    console.error("'/passwordchange' is not yet implemented, sorry!");
    response.redirect("/");
});

app.get("/localStorage/*", (request, response) => {
    let neededDoc = request.url.split("/");
    neededDoc = neededDoc[neededDoc.length - 1];
    console.log("NEEDED DOCUMENT", neededDoc);

    response.sendFile(__dirname + request.url);
});

app.use(express.static(__dirname + "/web"));