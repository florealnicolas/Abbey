const express = require("express");
const bodyParser = require("body-parser");
const LocalStorage = require("node-localstorage").LocalStorage;
const PouchDB = require("pouchdb");
const User = require("./User");
const session = require("client-sessions");

const port = 1810;
const environment = "production";

const sessionSettings = {
    cookieName: 'session',
    secret: 'sleep thight, my little niao',
    duration: 30 * 60 * 1000,
    activeDuration: 30 * 60 * 1000,
    ephemeral: true,
    httpOnly: true
};

let etc = new LocalStorage("./localStorage/etc");
const app = express();

const userDB = new PouchDB("users");

app.use(bodyParser.urlencoded({extended: true}));
app.use(session(sessionSettings));

app.set("environment", environment);
etc.setItem("environment", app.get("environment"));

app.listen(port, () => {
    console.log("Listening on port " + port + "...");
    console.log("IDEA: Why not put the elements/data on the server side?");
    console.log("IDEA: Show a notification when the password is changed.");
    console.log("IDEA: Use the place name as a verification when the password is forgotten!");
    console.log("MUST: DELETE PASSWORD FROM SESSIONVALUE!");
});

userDB.info().then(function (info) {
    console.log("INFO", info);

    userDB.allDocs().then(function (result) {
        console.log("All users", result);
    });
});

app.get("/", (request, response, next) => {

    console.log("SESSION: ", request.session);

    next();
});

app.get("/resetThisAll", (response, request) => {
    userDB.destroy().then(function(success){
        console.log(success);
    }).catch(function(error){console.log(error)});
});

app.get("/login", (request, response) => {
    response.sendFile(__dirname + "/web/login.html");
});

app.post("/login", (request, response) => {

    const potentialUser = request.body.user;

    userDB.get(potentialUser.username).then(function (user) {
        let error = undefined;

        if (user.password !== potentialUser.password) {
            console.log("The password is incorrect for user: " + user.playerName + ".");
            error = "Incorrect password for username '" + user.playerName + "'.";
            response.send(JSON.stringify({value: error, status: "error"}));
        }

        else {
            console.log(user.playerName + " is successfully logged on!");
            request.session.user = user;
            request.session.active = true;
            response.send(JSON.stringify({value: user, status: "success"}));
        }

    }).catch(function (error) {
        error = "No user with username '" + potentialUser.username + "' was found.";
        errorResponse = {value: error, status: "error"};
        response.send(JSON.stringify(errorResponse));
    });

});

app.get("/logout", (request, response) => {
    request.session.reset();
    response.redirect("/");
});

app.get("/session", (request, response) => {
    response.send(request.session)
});

app.post("/registering", (request, response) => {

    let registeringData = request.body;

    userDB.put(registeringData, function (error, success) {
    });
});

app.post("/passwordchange", (request, response) => {

    const currentPassword = request.body.passwordChange.currentPassword;
    const newPassword = request.body.passwordChange.newPassword;
    const confirmNewPassword = request.body.passwordChange.confirmNewPassword;

    userDB.get(request.session.user.playerName).then(function (user) {

        if (user.password === currentPassword && newPassword === confirmNewPassword) {
            user.password = newPassword;

            userDB.put(user);

            console.log("Password successfully changed!");
        }

        response.end();

    });

});

app.post("/saveGame", (request, response) => {

    let gameSafe = request.body;

    console.log("GAMESAFE TO SAVE", gameSafe);

    //GAMESAFE INTO SESSION
    request.session.user.game = gameSafe;

    //GAMESAFE INTO DB
    userDB.get(request.session.user.playerName).then(function (user) {

        user.game = gameSafe;

        userDB.put(user);

        console.log("Game successfully saved!");
        console.log("IN SESSION", request.session.user.game);

        response.end();

    });
});

app.post("/loadGame", (request, response) => {
    console.log("SAVE GAME IS NOT YET IMPLEMENTED!");
});

app.get("/resetAccount", (request, response) => {
    console.log("SAVE GAME IS NOT YET IMPLEMENTED!");
});

app.get("/localStorage/*", (request, response) => {
    let neededDoc = request.url.split("/");
    neededDoc = neededDoc[neededDoc.length - 1];
    console.log("Going to serve document: ", neededDoc);

    response.sendFile(__dirname + request.url);
});

app.use(express.static(__dirname + "/web"));