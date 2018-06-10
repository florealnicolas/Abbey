const express = require("express");
const bodyParser = require("body-parser");
const LocalStorage = require("node-localstorage").LocalStorage;
const nano = require('nano')('http://localhost:5984');
const User = require("./server/User");
const session = require("client-sessions");
const weather = require("openweathermap");
const authenticator = require("./server/authenticate");

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

let etc = new LocalStorage("./server/localStorage/etc");
const app = express();

let userDB = nano.use("abbey-users");

userDB.info(function(error, body) {

  "use strict";

  if (error !== null && error.error === "not_found") {
    nano.db.create("abbey-users", function(error) {

      if (error) {
        console.log("USERDB-CREATION-ERROR:", error);
      }

      userDB = nano.use("abbey-users");

      userDB.info(function(error, body) {

        if (error) {
          console.log("USERDB-ERROR:", error);
        } else {
          console.log("USERDB-INFO", body);

        }

      });
    })
  }

});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session(sessionSettings));
//app.use(authenticator);

app.set("environment", environment);
etc.setItem("environment", app.get("environment"));

app.listen(port, () => {
  console.log("Listening on port " + port + "...");
  console.log("IDEA: Why not put the elements/data on the server side?");
  console.log("IDEA: Show a notification when the password is changed.");
  console.log("IDEA: Use the place name + player secret as a verification when the password is forgotten!");
  console.log("IDEA: LIST.toJSON() => for-Object-in-List.json!");
  console.log("IDEA: Give Beers their own space in Elements + alcohol!");
  console.log("IDEA: Weather generator!");
  console.log("IDEA: Not found-page.");
  console.log("IDEA: https://opencollective.com ???");
});

weather.defaults({
  units: 'metric',
  lang: 'en',
  mode: 'json',
  APPID: 'f7728844f0ca7562825a49f1240c09a2'
});

//ROOT

app.get("/", (request, response, next) => {

  console.log("SESSION: ", request.session);

  if (request.session.user === undefined) {
    response.redirect("/login");
  } else {
    next();
  }
});

//POSTERS

app.post("/login", (request, response, next) => {

  const potentialUser = request.body.user;

  userDB.get(potentialUser.emailAddress, function(error, user) {

    let feedback = {
      value: undefined,
      status: undefined
    };

    if (error) {
      console.log("LOGIN-ERROR:", error.message);

      feedback.status = "error";
      feedback.value = "There is no user registered with this email address.";
    } else {
      console.log("POTENTIAL USER:", user);

      if (user.password !== potentialUser.password) {
        console.log("Incorrect password.");
        error = "Sorry, wrong password.";
        feedback = {
          value: error,
          status: "error"
        };
      } else {
        console.log(user.emailAddress + " is successfully logged on!");
        request.session.user = user;
        request.session.active = true;
        feedback = {
          value: user,
          status: "success"
        };
      }
    }

    response.send(feedback);
  });
});

app.post("/register", (request, response) => {

  const userData = request.body;

  console.log("USER:", userData);

  const registrationDate = new Date().toJSON();

  const newUser = new User(userData.emailAddress, userData.password, registrationDate);

  userDB.insert(newUser.toJSON(), function(error, user) {
    "use strict";

    if (error) {
      console.log("REGISTER-INSERT-ERROR:", error);
    } else {

      console.log("USER:", user);

      response.send(user.ok);

      /*gameDB.insert({game:undefined},user.id+"-game", function (error, game) {

       if (error) {
       console.log("GAME-INSERT-ERROR:", error);
       }
       else {
       console.log("GAME-ATTACHMENT:", game);
       console.log(newUser.username + " has been added to the pack.");
       response.redirect("/login");
       }


       })*/


    }
  });

});

app.post("/passwordchange", (request, response) => {

  const currentPassword = request.body.passwordChange.currentPassword;
  const newPassword = request.body.passwordChange.newPassword;
  const confirmNewPassword = request.body.passwordChange.confirmNewPassword;

  userDB.get(request.session.user.playerName).then(function(user) {

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

  userDB.get(request.session.user.emailAddress, function(error, user){

      if(!error){

        userDB.insert(request.session.user, function(error, feedback){

          if(!error){
            response.send(feedback.ok);
          }
          else {
            console.log("GAME SAVE-INSERT USER-ERROR:",console.error());
          }
        })

      }
      else {
        console.log("GAME SAVE-GET USER-ERROR:",error);
      }

  });
});

app.post("/loadGame", (request, response) => {
  console.log("SAVE GAME IS NOT YET IMPLEMENTED!");
});

app.post("/addNewRecipe", (request, response) => {

  const newRecipeData = request.body;

  console.log("DATA", newRecipeData);

  recipeDB.put(newRecipeData, function(error, success) {

    if (error) {
      console.log("RECIPE-PUT-ERROR:", error);
    }

  });

  response.end();

});

//GETTERS

app.get("/resetAccount", (request, response) => {
  console.log("SAVE GAME IS NOT YET IMPLEMENTED!");
});

app.get("/getRecipes", (request, response) => {

  recipeDB.allDocs().then(function(result) {

    response.send(result);

  });

});

app.get("/addNewRecipe", (request, response) => {

  response.sendFile(__dirname + "/web/newRecipe.html");

});

app.get("/server/localStorage/*", (request, response) => {
  let neededDoc = request.url.split("/");
  neededDoc = neededDoc[neededDoc.length - 1];
  console.log("Going to serve document: ", neededDoc);

  response.sendFile(__dirname + request.url);
});

app.get("/logout", (request, response) => {
  request.session.reset();
  response.redirect("/");
});

app.get("/session", (request, response) => {

  const filteredSession = {
    emailAddress: request.session.user.emailAddress,
    active: request.session.active
  };

  console.log("SESSION:", filteredSession);

  response.send(filteredSession);
});

app.get("/getActiveUser", (request, response) => {

  const wantedUser = request.session.user.emailAddress;

  console.log("WANTED USER:", wantedUser);

  userDB.get(wantedUser, function(error, user) {

    if (error) {
      console.log("GET-USER-ERROR:", error);
    }

    let userInfo = {
      emailAddress: user.emailAddress,
      registrationDate: user.registrationDate,
      game: user.game
    };

    response.send(userInfo);

  });

});

app.get("/register", (request, response) => {
  response.sendFile(__dirname + "/web/register.html");
});

app.get("/getWeather", (response, request) => {

  console.log("SESSION", request.session);
  const placeName = request.session.user.game.storySafe.placeName;

  weather.now({
    q: placeName
  }, (error, result) => {
    const weather = result.weather;
    console.log("Weather", result);
    console.log("Currently it is " + weather[0].main + " in " + result.name);

    response.send({
      weather: weather[0].main,
      place: result.name
    });
  });

});

app.get("/resetThisAll", (response, request) => {

  userDB.destroy().then(function(success) {
    console.log(success);
  }).catch(function(error) {
    console.log(error)
  });
});

app.get("/login", (request, response) => {
  response.sendFile(__dirname + "/web/login.html");
});

//SETTINGS

app.use(express.static(__dirname + "/web"));

app.use(function(request, response) {
  console.log("ROUTE", request.route);
  console.log("Route", request.url);
  if (!request.route) {
    response.statusCode = 404;
    response.sendFile(__dirname + "/web/404.html");
  }

});
