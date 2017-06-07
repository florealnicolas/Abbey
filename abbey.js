const express = require("express");

const port = 1810;

const app = express();

app.listen(port, () => {
    console.log("Listening on port " + port + "...");
});

app.use(express.static(__dirname + "/web"));