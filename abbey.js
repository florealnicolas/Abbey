const express = require("express");
const LocalStorage = require("node-localstorage").LocalStorage;

const port = 1810;
const environmentStatus = "production";
let localStorage = new LocalStorage("./localStorage");
const app = express();

app.set("env", environmentStatus);
localStorage.setItem("env", app.get("env"));

app.listen(port, () => {
    console.log("Listening on port " + port + "...");
});

app.get("/", (request, response, next) => {
    next();
});

app.get("/login", (request, response) => {
    response.sendFile(__dirname + "/web/login.html");
});

app.get("/localStorage/*", (request, response) => {
    let neededDoc = request.url.split("/");
    neededDoc = neededDoc[neededDoc.length - 1];
    console.log("NEEDED DOCUMENT", neededDoc);

    response.sendFile(__dirname + request.url);
});

app.use(express.static(__dirname + "/web"));