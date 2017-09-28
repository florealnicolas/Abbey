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

    userDB.allDocs().then(function (result) {
        console.log("All documents", result);
    });
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    name: 'abbeyUser',
    secret: 'AbbeyIsFun',
    cookie: {maxAge: 6000},
    resave: false,
    saveUninitialized: true
}));

app.set("environment", environment);
etc.setItem("environment", app.get("environment"));

app.listen(port, () => {
    console.log("Listening on port " + port + "...");
});

app.get("/", (request, response, next) => {
    console.log("USER", request.session.abbeyUser);
    next();
});

app.get("/login", (request, response) => {
    response.sendFile(__dirname + "/web/login.html");
});

app.post("/login", (request, response) => {

    const potentialUser = request.body.user;
    console.log("POTENTIAL USER",potentialUser);

    userDB.get(potentialUser.username).then(function (user) {
        let foundUser = undefined;
        let error = undefined;

        if (user.password !== potentialUser.password){
            console.log("The password is incorrect for user: "+user.username + ".");
            error = "Incorrect password for username '"+user.userName+"'.";
            response.end(JSON.stringify({value:error, status:"error"}));
        }

        else {
            console.log(user.username + " is successfully logged on!");
            response.end(JSON.stringify({value:user, status:"success"}));
        }

    }).catch(function (error) {
        error = "No user with username '" + potentialUser.username + "' was found.";
        errorResponse = {value: error, status: "error"};
        console.error("error",errorResponse);
        response.end(JSON.stringify(errorResponse));
    });

    /*userDB.destroy().then(function(success){
     console.log(success);
     }).catch(function(error){console.log(error)});*/

});

app.post("/logout", (request, response) => {
    console.log("HERE!");
    request.session.abbeyUser = null;
    request.session.active = false;
    response.redirect("/");
});

app.post("/registering", (request, response) => {

    let player = request.body;

    const user = new User(player.playerName, player.password, player.playerGendre, player.coins, player.reputation);

    console.log("REQUEST", user.toJSON());

    userDB.put(user.toJSON(), function (error, success) {
        console.log(success);
    });
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