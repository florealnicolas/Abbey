(function($, window, document) {

  //Resources needed in the game

  //FOREST

  //Liya's recommendations

  //const banana = new Resource("banana");
  //const daisy = new Resource("daisy");
  //const rose = new Resource("rose");
  //const chestnut = new Resource("chestnut");
  //const herb -> more specific;

  //Stop

  $(document).ready(function() {

    $.get("/server/localStorage/etc/environment", function(environment) {

      $.get("/session", function(session) {

        const game = new Game();
        game.gameInitialisation();

        if (environment === "development") {
          developmentMode(game);
        }

        $.get("/getActiveUser", function(user) {

          console.log("USER", user);

          let activePlayer = undefined;

          if (user.game === undefined){
            game.setStrangerMode("ON");
            game.visualize();
          }

          else {
            game.setStrangerMode("OFF");
            activePlayer = new Player(user.game.playerSafe.playerName, user.game.playerSafe.coins, user.game.playerSafe.reputation);
            activePlayer.setPlayerGendre(user.game.playerSafe.playerGendre);

            console.log("ACTIVE PLAYER", activePlayer);

            game.setAPlayer(activePlayer);

            game.loadGame(user.game);
            game.visualize();

            showFirstPage();
            showNCRCounter(game);

            //DEFAULT SAVETIMER
            game.setSaveTimer(window.setInterval(function() {
              $.post("/saveGame", game.saveGame());
              game.getNotifier().notifySomething("Game saved!");
            }, 15 * 60 * 1000));
          }

        });

      });
    });

  });
})(window.jQuery, window, document);
